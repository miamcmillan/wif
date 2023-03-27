const file_upload = document.getElementById('file_upload');

const fileChosen = document.getElementById('file_chosen');

const viewBtn = document.getElementById("viewBtn");
var fileUploaded = false;



//catch error here
file_upload.addEventListener('change', function(){

  fileChosen.textContent = this.files[0].name
  viewBtn.className = "viewBtnTrue";
  fileUploaded = true;
})

viewBtn.addEventListener('click', function(){
    if (fileUploaded){
        window.location = 'visualPage.html'
    }
})

var weft_color;
var warp_color;


function readFile(input) {
    let file = input.files[0];

    let reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function() {
  
        splitFile(reader.result)
    };

    reader.onerror = function() {

    };
}


function splitFile(input) {
 
    var color_palette = new Array;
    var text = new Array;
    var weaving = new Array;
    var warp = new Array;
    var weft = new Array;
    var color_table = new Array;
    var threading = new Array;
    var tieup = new Array;
    var treadling = new Array;
    var liftplan = new Array;
    var isLiftplan = false;
    var warp_color_list = new Array;
    var weft_color_list = new Array;
    var multiple_warp = false;
    var multiple_weft = false;

    

    const file = (input).split(/\r?\n/);

    if (file.indexOf('[COLOR PALETTE]') != -1) {
        index = file.indexOf('[COLOR PALETTE]') + 1
        while (file[index].includes('=')) {
            color_palette.push(file[index])
            index++;
            
        }
    }
  
    if (file.indexOf('[WEAVING]') != -1) {
        index = file.indexOf('[WEAVING]') + 1
        while (file[index].includes('=')) {
            weaving.push(file[index])
            index++;
        }
    }
    if (file.indexOf('[WARP]') != -1) {
        index = file.indexOf('[WARP]') + 1
        while (file[index].includes('=')) {
            warp.push(file[index])
            index++;
        }
    }

    if (file.indexOf('[WEFT]') != -1) {
        index = file.indexOf('[WEFT]') + 1
   
        while (file[index].includes('=')) {
            weft.push(file[index])
            index++;
        }
    }
    if (file.indexOf('[COLOR TABLE]') != -1) {
        index = file.indexOf('[COLOR TABLE]') + 1
        while (file[index].includes('=')) {
            color_table.push(file[index])
            index++;
        }
    }
    if (file.indexOf('[THREADING]') != -1) {
        index = file.indexOf('[THREADING]') + 1
        while (file[index].includes('=')) {
            threading.push(file[index])
            index++;
        }
    }
    if (file.indexOf('[TIEUP]') != -1) {
        index = file.indexOf('[TIEUP]') + 1
        while (file[index].includes('=')) {
            tieup.push(file[index])
            index++;
        }
    }
    if (file.indexOf('[TREADLING]') != -1) {
        index = file.indexOf('[TREADLING]') + 1
        while (file[index].includes('=')) {
            treadling.push(file[index])
            index++;
        }
    }

    if (file.indexOf('[LIFTPLAN]') != -1) {

        isLiftplan = true;
        index = file.indexOf('[LIFTPLAN]') + 1
        while (file[index].includes('=')) {
            liftplan.push(file[index])
            index++;
        }
    }


    

    if (file.indexOf('[WARP COLORS]') != -1) {
        index = file.indexOf('[WARP COLORS]') + 1
        while (file[index].includes('=')) {
            warp_color_list.push(file[index])
            multiple_warp = true;
            index++;     
        }  
    }

    if (file.indexOf('[WEFT COLORS]') != -1) {
        index = file.indexOf('[WEFT COLORS]') + 1
        while (file[index].includes('=')) {    
            weft_color_list.push(file[index])
            multiple_weft = true;
            index++;
            
        }
    }

    //NOW GET COLOURS??
    var weft_color_digit;
    var warp_color_digit;

    for (x in warp) {
        if (warp[x].includes('Color')) {
            
            warp_color_digit = (warp[x].split('='))[1] 
        }
    }
    for (x in weft) {
        if (weft[x].includes('Color')) {
            weft_color_digit = (weft[x].split('='))[1] 
        } 
    }



    //BELOW CODE IS IF WIF HAS MULTIPLE COLORS (WARP COLORS OR WEFT COLORS)
    warp_colors_list_split = new Array;
    weft_colors_list_split = new Array;


    weft_color = (color_table[(weft_color_digit-1)].split('='))[1]
    warp_color = (color_table[(warp_color_digit-1)].split('='))[1]

 
    
    if (warp_color_list.length > 0) {
        multiple_warp = true;
        x = 1 
        y = 0
        while (x < threading.length) {
            warp_temp = (warp_color_list[y].split('='))
            if (warp_temp[0] == (x)) {
                warp_split = warp_temp[1]
                temp = (color_table[(warp_split-1)].split('='))[1]
                y ++
            } else {
                temp = warp_color
            }
            x++
            warp_colors_list_split.push(temp)
        }

        localStorage.setItem("warp_color_list", JSON.stringify(warp_colors_list_split));
    }

   //it is not entering below !!!!!

    if (weft_color_list.length > 0) {
        
        multiple_weft = true;
        x = 1 
        y = 0
       
        if (isLiftplan) {
            comparitor = liftplan.length
        } else {
            comparitor = treadling.length
        }
        while (x < comparitor) {

           
            weft_temp = (weft_color_list[y].split('='))

            if (weft_temp[0] == (x)) {
           
                weft_split = weft_temp[1]
     
                temp = (color_table[(weft_split-1)].split('='))[1]
            
                y ++
            } else {
                temp = weft_color
            }
            x++
            
            weft_colors_list_split.push(temp)
        }

        localStorage.setItem("weft_color_list", JSON.stringify(weft_colors_list_split));
    }

    

  
    if (isLiftplan) {
        localStorage.setItem("liftplan", JSON.stringify(liftplan));
    } else {
        localStorage.setItem("treadling", JSON.stringify(treadling));
        localStorage.setItem("tieup", JSON.stringify(tieup));
    }

    localStorage.setItem("threading", JSON.stringify(threading));
    localStorage.setItem("isLiftplan", isLiftplan);
    localStorage.setItem("isWarpColors", multiple_warp);
    localStorage.setItem("isWeftColors", multiple_weft);

    
    localStorage.setItem("weft_color", weft_color);
    localStorage.setItem("warp_color", warp_color);

    colors()
   
}

function colors() {
 
    warp_color = localStorage.getItem("warp_color");
    weft_color = localStorage.getItem("weft_color");
    multiple_warp = localStorage.getItem("isWarpColors");
    multiple_weft = localStorage.getItem("isWeftColors");
    warp_color_list_updated = new Array;
    weft_color_list_updated = new Array;



    if (multiple_warp == "true") {
       
        const warp_colors_list = JSON.parse(localStorage.getItem("warp_color_list"));
        for (x in warp_colors_list) {    
            warp_color_list_updated.push(color_individual(warp_colors_list[x]))
        }     
    }
    if (multiple_weft == "true") {
       
        const weft_colors_list = JSON.parse(localStorage.getItem("weft_color_list"));
        for (x in weft_colors_list) {    
            weft_color_list_updated.push(color_individual(weft_colors_list[x]))
        }     
    }

    function color_individual(color) {
        color_split = color.split(',')
        
        color_rgb = color_split.map(rgb)
        color_hex = color_rgb.map(rgb2hex)


        function rgb(string) {
            digit = parseInt(string)
            return Math.floor(digit/4)
        }
        
        format = "#" + `${color_hex[0]}${color_hex[1]}${color_hex[2]}`;
        
        return format

    }

    warp_color = color_individual(warp_color)
    weft_color = color_individual(weft_color)
   
    display()
}

function rgb2hex(num) {
    
    var rgbDict = {
        10: "A",
        11: "B",
        12: "C",
        13: "D",
        14: "E",
        15: "F"
      };
      
      first = Math.floor(num/16)
      remainder = (num/16) - first
      second = Math.floor(remainder*16)
      
      if (first > 9){
        first = rgbDict[first]
      }
      if (second > 9){
        second = rgbDict[second]
      }
      const both = `${first}${second}`;

      return both
}


function display() {

    var count = 0;

    const canvas = document.querySelector(".myCanvas");
    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    var treadling = new Array;
    var tieup = new Array;
    var liftplan = new Array;
    
    var isLiftplan = localStorage.getItem("isLiftplan");

    if (isLiftplan == "true") {

        liftplan = JSON.parse(localStorage.getItem("liftplan"));

    } else {
        treadling = JSON.parse(localStorage.getItem("treadling"));
        tieup = JSON.parse(localStorage.getItem("tieup"));
    }

    const threading = JSON.parse(localStorage.getItem("threading"));
       
    ctx.strokeStyle = "black";

    var reg = 0;
    if (isLiftplan == "true") {
  
        reg = Math.min((Math.floor((width*0.5)/threading.length)), (Math.floor((width*0.5)/liftplan.length)))

    } else {
        reg = Math.min((Math.floor((width*0.5)/threading.length)), (Math.floor((width*0.5)/treadling.length)))
    }

    for (x in threading) { 
        //alert("new threading")
        thread_split = threading[x].split('=')
        thread = thread_split[1]
       
        tieup_set = []

        if (isLiftplan == "true") { 
         
            for (y in liftplan) {
         
                //alert("new liftplan")
         
           
                liftplan_split = liftplan[y].split('=')
                liftplan_array = liftplan_split[1].split(',')
                
                
                    if (liftplan_array.includes(thread)) {
                        //alert("weft color")
                        
                        ctx.fillStyle = warp_color;
                        ctx.fillRect(((threading.length - thread_split[0])-1) * reg, (liftplan_split[0]-1) * reg, reg, reg);
                    } else {
                        //alert("warp color")
                        ctx.fillStyle = weft_color;
                        ctx.fillRect(((threading.length - thread_split[0])-1) * reg, (liftplan_split[0]-1) * reg, reg, reg);
                    }

                    if (multiple_warp == "true") { 
                        if (y < warp_color_list_updated.length) {
                            warp_color = warp_color_list_updated[y]
                        } 
                    }
                    
                }
                if (multiple_weft == "true") { 
                    
    
                    if (x < weft_color_list_updated.length) {
           
                        weft_color = weft_color_list_updated[x]
                    } 
                }
                
             

        } else {
                     
            for (y in tieup) {
           
                tieup_split = tieup[y].split('=')
                tie_up_array = tieup_split[1].split(',')
                
                    if (tie_up_array.includes(thread)) {
                        tieup_set.push(tieup_split[0]) 
                    }
                }
                
    
                for (z in treadling) { 
                    
                    tread_split = treadling[z].split('=')
                    tread = tread_split[1]
                    if (tieup_set.includes(tread)) {
                        
                        ctx.fillStyle = warp_color;
                        ctx.fillRect(((threading.length - thread_split[0])-1) * reg, (tread_split[0]-1) * reg, reg, reg);
                        
                    } else {
                      
                        ctx.fillStyle = weft_color;
                        ctx.fillRect(((threading.length - thread_split[0])-1) * reg, (tread_split[0]-1) * reg, reg, reg);
                       
                    }
                    if (multiple_warp == "true") { 
                        if (count < warp_color_list_updated.length) {
                            warp_color = warp_color_list_updated[count]
                        } 
                    }
                }                      
            }
            
            count ++

        }
     
    document.getElementById("download").addEventListener("click", function() {
        var dataURL = canvas.toDataURL();
        this.href = dataURL;
        this.download = "WIFImage.png";
    })


    //below code is all for edit color modal.

    var modal = document.getElementById("myModal");
    var colorInputWeft = document.getElementById('colorWeft')
    var colorInputWarp = document.getElementById('colorWarp')

    colorInputWeft.value = weft_color;
    colorInputWarp.value = warp_color;


    var btn = document.getElementById("edit");
    var applyBtn = document.getElementById("applyColor");


    var span = document.getElementsByClassName("close")[0];


    btn.onclick = function() {
        modal.style.display = "block";
    }

    applyBtn.onclick = function() {
        weft_color = colorInputWeft.value
        warp_color = colorInputWarp.value
        self.display()
        modal.style.display = "none";
    }


    span.onclick = function() {
        colorInputWarp.value = weft_color;
        colorInputWeft.value = warp_color;
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
        modal.style.display = "none";
    }
    }


    window.addEventListener('resize', function(event){
        this.location.reload();
      });


}
    
