import { Stripe } from "./wasm_test_pattern";
// import { memory } from "./wasm_test_pattern";

const GRID_COLOR = "#111111";

const s = Stripe.new(32, 32, 20);
const mod_h = s.get_mod_height();
const mod_w = s.get_mod_width();
const numModsPerCabinet = s.height()/mod_h;

console.log("h,w", s.height(), s.width());
const canvas = document.getElementById("test-pattern-canvas");
canvas.height = s.height();
canvas.width = s.width();

console.log(canvas.height, canvas.width);
const ctx = canvas.getContext('2d');

const drawGrid = () => {
    ctx.beginPath();
    ctx.lineWidth = 1 / window.devicePixelRatio;
    ctx.strokeStyle = GRID_COLOR;
    
    ctx.moveTo(0, 0);
    ctx.lineTo(0, canvas.height);

    ctx.moveTo(0, canvas.height);
    ctx.lineTo(canvas.height, canvas.width);

    // Vertical lines
    for (let x = 0; x < numModsPerCabinet; x++ ) {
        for (let i = 0; i <= canvas.width; i++ ) {
            ctx.moveTo(i * mod_w, (x * mod_w));
            ctx.lineTo(i * mod_w, mod_w + (x * mod_w));
        }

        // // Horizontal lines
        for (let j = 0; j <= canvas.width; j++) {
            ctx.moveTo(0, j * mod_h);
            ctx.lineTo((mod_h + 1) * canvas.width,  j * (mod_w + 1));
        }

        for (var j = 0; j < s.get_num_mods(); j++) {
            ctx.fillStyle = 'rgba(27,255,0, 50)';
            ctx.fillRect(j * mod_w, x*mod_h, mod_w, mod_h);
        }


    }

    ctx.stroke();
};

const drawCells = () => {
}


drawGrid();
// drawCells();
