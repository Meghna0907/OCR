new Vue({
    el:'#app',
    data(){
        return{
            image:null,
            extractedText:null,
            loading: false,
            wordCount: 0,
            charCount: 0,
            words: [],
            showChartHeader: false,
            chart: null,
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
            this.showChartHeader=false;
        },
        extractText(){
            debugger;
            this.loading=true;
            this.showChartHeader=false;
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
            this.wordCount=0;
            this.charCount=0;
            this.showChartHeader=false;
            this.words = this.extractedText.toLowerCase().split(/[ ,\s\n.]+/).filter(Boolean);; // Split by whitespace /\s+/     /[ ,]+/
            this.wordCount = this.words.length;
            this.words.forEach(element => {
                this.charCount += element.length;
            });
        },
        createChart(){
            debugger;
            this.showChartHeader=true;
            const wordCountDict={};
            for(const word of this.words){
                if(wordCountDict[word]){
                    wordCountDict[word]++;
                }
                else{
                    wordCountDict[word] = 1;
                }
            }
            const canvas = document.getElementById("myChart");
            let labels = Object.keys(wordCountDict);
            let counts = Object.values(wordCountDict);
            // Ensure the canvas is cleared before creating a new chart
            if (this.chart) {
                this.chart.destroy();
            }
            const ctx= canvas.getContext("2d");
            const chartData ={
                labels: labels,
                datasets: [
                    {
                        label: "Word Count",
                        data: counts,
                        borderwidth: 1,
                    }
                ],
            };
            this.chart =new Chart(ctx,{
                type:"bar",
                data: chartData,
            });
        },
    },
});