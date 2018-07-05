import { Stripe } from "./wasm_test_pattern";
// import { memory } from "./wasm_test_pattern";

const GRID_COLOR = "#111111";

const s = Stripe.new(32, 32, 20);
const letterMap = s.get_letter_map();
const mod_h = s.get_mod_height();
const mod_w = s.get_mod_width();
const numModsPerCabinet = s.height()/mod_h;
const numMods = s.get_num_mods();

const canvas = document.getElementById("test-pattern-canvas");
canvas.height = s.height();
canvas.width = s.width();

const ctx = canvas.getContext('2d');

const drawGrid = () => {
    ctx.beginPath();
    ctx.lineWidth = 1 / window.devicePixelRatio;
    ctx.strokeStyle = GRID_COLOR;
    ctx.font = "14px sans-serif";
    
    // Vertical lines
    for (let l = 0; l < numModsPerCabinet; l++ ) {
        for (let i = 0; i <= canvas.width; i++ ) {
            ctx.moveTo(i * mod_w, (l * mod_w));
            ctx.lineTo(i * mod_w, mod_w + (l * mod_w));
        }

        // // Horizontal lines
        for (let j = 0; j <= canvas.width; j++) {
            ctx.moveTo(0, j * mod_h);
            ctx.lineTo((mod_h + 1) * canvas.width,  j * (mod_w + 1));
        }

        for (var j = 0; j < numMods; j++) {
            ctx.fillStyle = 'rgba(27,255,0, 50)';
            ctx.fillRect(j * mod_w, l * mod_h, mod_w, mod_h);

            ctx.fillStyle = GRID_COLOR;
            var x_adjust =  4;
            if ( j < 10 ) x_adjust = 6;
            var alpha = letterMap[l % 27];
            
            ctx.fillText( alpha + j , j * mod_w + x_adjust, 20 + (l*mod_h), mod_w);
        }
    }

    ctx.stroke();
};

const drawCells = () => {
}


drawGrid();
// drawCells();
