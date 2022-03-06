const $siteList = $('.siteList');
const $addButton = $siteList.find('.addButton');
const x = localStorage.getItem('x');
const xObject = JSON.parse(x);
const hashMap= xObject || [
  {logo:'a',url:'https://www.apple.com'},
  {logo:'b',url:'https://www.bilibili.com'},
  {logo:'c',url:'https://ctrip.com'}
]
const simplifyurl = (url)=>{          //简化url
  return url.replace('https://','')
  .replace('http://','')
  .replace(/\/.*/,'')   //删除'/'开头的元素
}
const render = ()=>{                 //将hashMap中的每一项添加到页面中
  hashMap.forEach((node,index)=>{           //logo最初添加localStorage里的(如果不同,关闭本地存储后先改localStorage的value在清空刷新)
    const  $site = $(`
      <div class="site">
        <div class="logo">${node.logo}</div>
        <div class="link">${simplifyurl(node.url)}</div>
        <div class="close">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-close"></use>
          </svg>
        </div>
      </div>`).insertBefore($addButton)
    $site.on('click',()=>{
      window.open(node.url)
    })
    $site.on('click','.close',(e)=>{         //删除网站功能
      e.stopPropagation();
      hashMap.splice(index,1);
      $siteList.find('.site').remove();
      render();
    })
  })
}
render();
$('.addButton').on('click',()=>{          //点击添加网站
  let url = window.prompt('请输入添加的网址')
  if(url.indexOf('https') != 0) {
    url = 'https://' + url;
  }
  hashMap.push({logo:simplifyurl(url)[0]
  .toUpperCase()
  ,url:url})
  $siteList.find('.site').remove()       
  render();
});
window.onbeforeunload = ()=>{           //添加到本地存储
  const string = JSON.stringify(hashMap)
  localStorage.setItem('x',string)
}
$(document).on('keypress',(e)=>{         //添加用户键盘事件
  const {key} = e;
  for(let i=0;i<hashMap.length;i++) {
      if(hashMap[i].logo.toLowerCase() === key){
        window.open(hashMap[i].url);
      }
  }
})