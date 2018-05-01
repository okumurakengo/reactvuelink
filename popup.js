(function(){
    'use strict';
    document.addEventListener('DOMContentLoaded',e=>{

        new Vue({
            el:'#app',
            data:{
                linklist :[],
            },
            methods:{
                get_color:function(type){
                    switch(type){
                        case 'react':
                            return 'royalblue';
                        case 'vue':
                            return 'seagreen';
                    }
                }
            },
            created:function(){
                fetch('./link_update.json')
                .then(res=>res.json())
                .then(linklist=>{
                    this.linklist=linklist.map(data=>{
                        data.isHover=false;
                        return data;
                    });
                });
            }
        });

    },false);
})();
