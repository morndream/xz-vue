new Vue({
    el:"#app",
    data:{
        product:{price:0},
        pics:[],
        specs:[],
        picmd:"", //中图
        LIWIDTH:62,//每个li的宽度，反复使用
        sty1:{ //ul的样式
           width:'',
           marginLeft:''
        }, //超大图样式
        lg_sty:{
            background:'',
            display:'none',
            backgrounPosition:''
        }, 
        times:0 ,//按钮点击次数
        disL:"disabled",
        disR:"",
        masksty:{
            display:"none",
            top:"",
            left:""
        }
    },
    methods:{
        // 4.1点击左边箭头事件
        btlt(){
         //如果左边不禁用的时候,表示可以点击
         if(this.disL==''){
            this.times-=1;
            this.sty1.marginLeft=-this.LIWIDTH*this.times+"px"
            this.disR='';
            if(this.times===0){
                this.disL='disabled';
            }
         } 
        },
        //4.2 点击右边箭头事件
        btrt(){
            //如果右边不禁用的时候，表示可以点击
           if(this.disR==''){
               this.times+=1;
               this.sty1.marginLeft=-this.LIWIDTH*this.times+"px";
               this.disL='';
               if(this.times===this.pics.length-4){
                   this.disR='disabled';
               }
           }
        },
        //5: 鼠标进入小图片，切换中图片
        //事件委托，为父元素绑定鼠标进入事件，但是只有进入img时，才触发
        changmd(e){
            var li=e.target;
            var liImg=li.children[0];
            this.picmd=liImg.getAttribute('data-md');
            this.lg_sty.background=`url(${liImg.getAttribute('data-lg')})`;
        },
        // 鼠标进入中图片范围显示透明遮罩
        showmk(){
           this.masksty.display="block";
           this.lg_sty.display="block";
        },
        // 鼠标出中图片范围隐藏透明遮罩
        hidmk(){
            this.masksty.display="none";
            this.lg_sty.display="none";
        },
        move(e){
           //透明遮罩的宽高
           var mkr=176;
           //中图片352px
           var mdr=352;
           var top=e.offsetY-mkr/2;
           var left=e.offsetX-mkr/2;
             //如果top<0,就拉回0, 如果top>SMSIZE-MSIZE，就拉回SMSIZE-MSIZE
           if(top<0){
              top=0;
           }else if(top>mdr-mkr){
              top=mdr-mkr;
           } //如果left<0,就拉回0, 如果left>SMSIZE-MSIZE，就拉回SMSIZE-MSIZE
           if(left<0){
               left=0;
           }else if(left>mdr-mkr){
               left=mdr-mkr;
           }
           this.masksty.top=top+"px";
           this.masksty.left=left+"px";
           //同时要修改$lgDiv的背景图片位置：
           this.lg_sty.backgroundPosition=`${-left*16/7}px ${-top*16/7}px`;  
        }
      

    },
    created(){
     axios.get("http://localhost:3000/details",{params:{
         lid:location.search.split("=")[1]
     }}).then(result=>{
        this.product=result.data.product;
        this.pics=result.data.pics;
        this.specs=result.data.specs;
        this.picmd=this.pics[0].md;
         //1:临时根据图片张数计算ul的宽:张数*图片宽
        this.sty1.width=this.pics.length*this.LIWIDTH+"px";
        //2:同时为lgDIv设置背景图片为第一张图片的lg版本
        this.lg_sty.background=`url(${this.pics[0].lg})`;
        // 3:初始化右边箭头，如果长度小于等于4，就禁用
        if(this.pics.length<=4){
            this.disR='disabled';
        }
     })
    },
    watch:{
        product(){
            console.log(this.product)
          },
          pics(){
            console.log(this.pics)
          },
          specs(){
            console.log(this.specs)
          }
    }
})