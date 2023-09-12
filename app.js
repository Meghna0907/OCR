new Vue({
    el:'#app',
    data(){
        return{
            image:null,
            extractedText:null,
            loading: false,
            wordCount: 0,
            charCount: 0,
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
            this.charCount=0;
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
        calculateWordCount(){
            debugger;
            const words = this.extractedText.toLowerCase().split(/[ ,\s\n.]+/).filter(Boolean);; // Split by whitespace /\s+/     /[ ,]+/
            this.wordCount = words.length;
            words.forEach(element => {
                this.charCount += element.length;
            });
        }
    },
});