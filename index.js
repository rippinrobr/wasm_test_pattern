import { Stripe } from "./wasm_test_pattern";

const GRID_COLOR = "#111111";

const s = Stripe.new(32, 32, 4, 20);
const letterMap = s.get_letter_map();
const mod_h = s.get_mod_height();
const mod_w = s.get_mod_width();
const numModsPerCabinet = s.height()/mod_h;
const numMods = s.get_num_mods();
let mod_str = s.calc_image();

if (!!mod_str) {
    alert("No mod information was found.");
    return;
}
const modInfo = JSON.parse(mod_str);

const canvas = document.getElementById("test-pattern-canvas");
canvas.height = s.height();
canvas.width = s.width();

const ctx = canvas.getContext('2d'); 
s.calc_image();

const drawGrid = () => {
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

    // Vertical lines
    // for (let l = 0; l < numModsPerCabinet; l++ ) {
    //     for (let i = 0; i <= canvas.width; i++ ) {
    //         ctx.moveTo(i * mod_w, (l * mod_w));
    //         ctx.lineTo(i * mod_w, mod_w + (l * mod_w));
    //     }

    //     // // Horizontal lines
    //     for (let j = 0; j <= canvas.width; j++) {
    //         ctx.moveTo(0, j * mod_h);
    //         ctx.lineTo((mod_h + 1) * canvas.width,  j * (mod_w + 1));
    //     }

    //     for (var j = 0; j < numMods; j++) {
    //         ctx.fillStyle = 'rgba(27,255,0, 50)';
    //         ctx.fillRect(j * mod_w, l * mod_h, mod_w, mod_h);

    //         ctx.fillStyle = GRID_COLOR;
    //         var x_adjust =  4;
    //         if ( j < 10 ) x_adjust = 6;
    //         var alpha = letterMap[l % 27];
            
    //         ctx.fillText( alpha + j , j * mod_w + x_adjust, 20 + (l*mod_h), 26);
    //     }
    // }

    ctx.stroke();
};

const drawCells = () => {
}


drawGrid();
// drawCells();
