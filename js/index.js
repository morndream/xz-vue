new Vue({
  el:"#f1",
  data:{
    p1:{price:0},
    p2:{price:0},
    p3:{price:0},
    pOthers:[]
  },
  created(){
    axios.get("http://localhost:3000/index").then(res=>{
      // console.log(res);
      this.p1=res.data[0];
      this.p2=res.data[1];
      this.p3=res.data[2];
      this.pOthers=res.data.slice(3);
    })
  },
  watch:{
   p1(){
     console.log(this.p1);
   },
   p2(){
    console.log(this.p2);
  },
  p3(){
    console.log(this.p3);
  },
  pOthers(){
    console.log(this.pOthers);
  }
  }

})