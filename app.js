new Vue({
    el:'#app',
    data(){
        return{
            image:null,
            extractedText:null,
            loading: false,
        };
    },
    methods:{
        loadImage(event){
            debugger;
            const file=event.target.files[0];
            const reader=new FileReader();
            reader.readAsDataURL(file);
            reader.onload=()=>{
                this.image=reader.result;
            };
        },
        extractText(){
            debugger;
            this.loading=true;
            Tesseract.recognize(
                this.image,
                'eng',
                {
                    logger: m=> console.log(m)
                }
            ).then(({data: {text}})=>{
                this.extractedText=text;
            }).finally(() => {
                this.loading = false;
            });
        },
    },
});