import { Stripe } from "./wasm_test_pattern";

// FROM HERE DOWN IS WHAT INTERACTS WITH WASM
const GRID_COLOR = "#111111";

// const mod_h = s.get_mod_height();
// const mod_w = s.get_mod_width();
// const mod_str = s.calc_image();
// const modInfo = JSON.parse(mod_str);
// const canvas = document.getElementById("test-pattern-canvas");

// canvas.height = s.height();
// canvas.width = s.width();
// const ctx = canvas.getContext('2d'); 



const drawGrid = (s) => {
    const mod_h = s.get_mod_height();
    const mod_w = s.get_mod_width();
    const mod_str = s.calc_image();
    const modInfo = JSON.parse(mod_str);
    const canvas = document.getElementById("test-pattern-canvas");

    canvas.height = s.height();
    canvas.width = s.width();
    const ctx = canvas.getContext('2d'); 

    ctx.beginPath();
    ctx.lineWidth = 1 / window.devicePixelRatio;
    ctx.strokeStyle = GRID_COLOR;
    ctx.font = "14px sans-serif";
    var fillColor = 'rgba(27,255,0, 50)';
    
    for (let i = 0; i < modInfo.length; i++) {
        let mod = modInfo[i];
        let x = mod.upper_left_xy.x;
        let y = mod.upper_left_xy.y;
        
        // draw left mod line
        ctx.moveTo(x, y);
        let y_adjustment = (mod_h * i);
        if (y_adjustment == 0) {
            y_adjustment = mod_h;
        }
        ctx.lineTo(x, y + y_adjustment);

        // draw top mod line
        ctx.moveTo(x, y);
        ctx.lineTo(x+ mod_w, y);   

        // fill it with color
        ctx.fillStyle = fillColor;
        ctx.fillRect(x,y, mod_w, mod_h);

        // Add Label
        ctx.fillStyle = GRID_COLOR;
        ctx.fillText( mod.label , mod.text_coords.x, mod.text_coords.y, 28);
    }

    // adds the right side line at the end of the image
    // and the bottom line
    ctx.moveTo(canvas.width-1, 0);
    ctx.lineTo(canvas.width-1, canvas.height);
    ctx.moveTo(canvas.width-1, canvas.height);
    ctx.lineTo(0, canvas.height);

    ctx.stroke();
};


// Here is where the form related code lives
const drawButton = document.getElementById("draw-image");
drawButton.addEventListener("click", event => { 
    var modHElem = document.getElementById("mod_h");
    var modWElem = document.getElementById("mod_w");
    var numModsInCabElem = document.getElementById("num_mods_in_cab");
    var numCabsElem = document.getElementById("cab_count");

    console.log("mod_h", modHElem.value,"\nmod_w", modWElem.value, "\n# mods in cab", numModsInCabElem.value, "\nnumCabsElem", numCabsElem.value);
    const s = Stripe.new(modHElem.value, modWElem.value, numModsInCabElem.value, numCabsElem.value);
    // calculates the upper left corner coordinates for each mod,
    // the label for the mod, and the coordinates for the text.
    s.calc_image();

    drawGrid(s);
});
