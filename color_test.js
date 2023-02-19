const file_upload = document.getElementById('file_upload');

const fileChosen = document.getElementById('file_chosen');

actualBtn.addEventListener('change', function(){
  fileChosen.textContent = this.files[0].name
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
    // contents: COLOR PALETTE, TEXT, WEAVING, WARP, WEFT, COLOR TABLE, THREADING, TIEUP, TREADLING
    // maybe loop through checking contents and adding them to variables as they come.

    var contents = new Array;
    var color_palette = new Array;
    var text = new Array;
    var weaving = new Array;
    var warp = new Array;
    var weft = new Array;
    var color_table = new Array;
    var threading = new Array;
    var tieup = new Array;
    var treadling = new Array;

    const file = (input).split(/\r?\n/);

    if (file[0] != "[WIF]") {
      
    }

    // SHOULD ADD ERROR HANDLING IF SOME OF THE BELOW COMPONENTS DO NOT EXIST???

    if (file.indexOf('[CONTENTS]') != -1) {
        index = file.indexOf('[CONTENTS]')
        while (file[index].charAt(0) != "[") {
            contents.push(file[index])
            index++;
        }
    }

    

    if (file.indexOf('[COLOR PALETTE]') != -1) {
        index = file.indexOf('[COLOR PALETTE]') + 1
        while (file[index].includes('=')) {
            color_palette.push(file[index])
            index++;
            
        }
    }
  

    if (file.indexOf('[TEXT]') != -1) {
        //DO WE ACC NEED THIS???
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

   

    weft_color = (color_table[(weft_color_digit-1)].split('='))[1]
    warp_color = (color_table[(warp_color_digit-1)].split('='))[1]

    localStorage.setItem("threading", JSON.stringify(threading));
    localStorage.setItem("treadling", JSON.stringify(treadling));
    localStorage.setItem("tieup", JSON.stringify(tieup));
    localStorage.setItem("weft_color", weft_color);
    localStorage.setItem("warp_color", warp_color);

    
}

function colors() {
    warp_color = localStorage.getItem("warp_color");
    weft_color = localStorage.getItem("weft_color");


    warp = warp_color.split(',')
    weft = weft_color.split(',')


    warp_rgb = warp.map(rgb)
    weft_rgb = weft.map(rgb)

    warp_hex = warp_rgb.map(rgb2hex)
    weft_hex = weft_rgb.map(rgb2hex)


    function rgb(string) {
        digit = parseInt(string)
        return Math.floor(digit/4)
    }

    weft_color = "#" + `${weft_hex[0]}${weft_hex[1]}${weft_hex[2]}`;
    warp_color = "#" + `${warp_hex[0]}${warp_hex[1]}${warp_hex[2]}`;

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

      //alert("done the calcs. First num is... " + first + "   Second is.... "+ second)

      if (first > 9){
        first = rgbDict[first]
      }
      if (second > 9){
        second = rgb[second]
      }
      const both = `${first}${second}`;

      
      return both


}


function display() {

    const canvas = document.querySelector(".myCanvas");
    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");


    const threading = JSON.parse(localStorage.getItem("threading"));
    const treadling = JSON.parse(localStorage.getItem("treadling"));
    const tieup = JSON.parse(localStorage.getItem("tieup"));
   
   
    ctx.strokeStyle = "black";

    /*for (let x=0; x<threading.length; x++) {
        for(let y=0; y<treadling.length; y++){
            ctx.strokeRect( x * 50, y * 50, 50, 50);
        }
    } 
    */
    
    reg = Math.min((Math.floor((width*0.5)/threading.length)), (Math.floor((width*0.5)/treadling.length)))

    for (x in threading) { //loop through threading
        thread_split = threading[x].split('=')
        thread = thread_split[1]
       
        tieup_set = []
        for (y in tieup) {
           
            tieup_split = tieup[y].split('=')
            tie_up_array = tieup_split[1].split(',')
            
            if (tie_up_array.includes(thread)) {
                
                tieup_set.push(tieup_split[0]) 
                
            }
        }
        for (z in treadling) { //can treadling include more than one digit??? or just one?? investigate.
            tread_split = treadling[z].split('=')
            tread = tread_split[1]
            if (tieup_set.includes(tread)) {
                //ctx.rect((thread_split[0]-1) * 50, (tread_split[0]-1) * 50, 50, 50);
                //ctx.fillStyle = 'rgb(' + warp_rgb[0] + ', ' + warp_rgb[1] + ', ' + warp_rgb[2] + ')';
                ctx.fillStyle = weft_color;
                ctx.fillRect((thread_split[0]-1) * reg, (tread_split[0]-1) * reg, reg, reg);
                //ctx.fillStyle = 'rgb(0, 0, 249)';
                
            } else {
                ctx.fillStyle = warp_color;
                ctx.fillRect((thread_split[0]-1) * reg, (tread_split[0]-1) * reg, reg, reg);
                //ctx.fillStyle = 'rgb(0, 0, 249)';
                
            }
        }
        
      
       /* NEXT STEP: CLEAN CODE, LOOK AT 6 SHAFT TWILL HEART FILE AND THE WARP/WEFT COLOR SECTIONS. THESE DONATE HOW 
       THE COLORS CHANGE AND IS THE NEXT IMPORTANT IMPLEMENTATION STEP.
       */
    
    }


    document.getElementById("download").addEventListener("click", function() {
            var dataURL = canvas.toDataURL();
            this.href = dataURL;
            this.download = "WIFImage.png";
        })


    


      
    //document.getElementById("edit").addEventListener("click", function() {
      //  colorInput = document.getElementById("color");
       // weft_color = colorInput.value
    //})


    // Get the modal
var modal = document.getElementById("myModal");
var colorInputWeft = document.getElementById('colorWeft')
var colorInputWarp = document.getElementById('colorWarp')

colorInputWeft.value = weft_color;
colorInputWarp.value = warp_color;


// Get the button that opens the modal
var btn = document.getElementById("edit");
var applyBtn = document.getElementById("applyColor");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

applyBtn.onclick = function() {
    weft_color = colorInputWeft.value
    warp_color = colorInputWarp.value
    self.display()
    modal.style.display = "none";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    colorInputWarp.value = weft_color;
    colorInputWeft.value = warp_color;
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
    //YOUVE MADE IT TOO COMPLICATED- ALL YOU NEED TO DO IS HAVE A BUTTON- WHEN PRESSED IT RE-RUNS CANVAS FUNCTION WITH
       // THE NEW COLOUR SAvED IN colorInput.value;
      

}