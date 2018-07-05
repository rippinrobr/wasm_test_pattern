#![feature(proc_macro, wasm_custom_section, wasm_import_module)]
#![cfg_attr(feature = "wee_alloc", feature(global_allocator))]

extern crate wasm_bindgen;
extern crate serde;
extern crate serde_json;
#[macro_use]
extern crate serde_derive;

use wasm_bindgen::prelude::*;
#[wasm_bindgen]
extern {
    //fn alert(s: &str);

    #[wasm_bindgen(js_namespace = console)]
    fn log(msg: &str);
}

#[wasm_bindgen]
pub struct Stripe {
    mod_h: u32,
    mod_w: u32,
    mods_in_cabinet: u32,
    num_cabinets: u32
}

#[wasm_bindgen]
#[derive(Debug, Serialize)]
pub struct Point {
    x: u32, 
    y: u32
}

#[derive(Debug, Serialize)]
pub struct ModInfo {
    pub upper_left_xy: Point,
    pub text_coords: Point,
    pub label: String, 
}

#[wasm_bindgen]
impl Stripe {

    pub fn new(mod_w: u32, mod_h: u32, num_mods_in_cab: u32, cab_count: u32) -> Stripe {
        Stripe {
            mod_h : mod_h,
            mod_w : mod_w,
            mods_in_cabinet: num_mods_in_cab,
            num_cabinets: cab_count,
        }
    }

    pub fn get_letter_map(&self) -> String {
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ".to_string()
    }

    pub fn get_cabinet_width(&self) -> u32 {
        self.mod_w * 2
    }

    // // calculate the height of the stripe bu multiplying mod_dims.height by 2
    // // since a crate is 2 mods high
    pub fn get_cabinet_height(&self) -> u32 {
        self.mod_h * 2
    }

    pub fn get_mod_width(&self) -> u32 {
        self.mod_w
    }

    // // calculate the height of the stripe bu multiplying mod_dims.height by 2
    // // since a crate is 2 mods high
    pub fn get_mod_height(&self) -> u32 {
        self.mod_h
    }

    pub fn get_num_cabinets(&self) -> u32 {
        self.num_cabinets
    }

    pub fn get_num_mods(&self) -> u32 {
        self.num_cabinets * 2
    }
    #[no_mangle]
pub extern "C" fn calc_image(&self) -> String {
        let mut letters: Vec<String> = Vec::new();
        for c in vec!["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"] {
            letters.push(c.to_string());
        }
        let mod_h = self.get_mod_height();
        let mod_w = self.get_mod_width();
        let num_mods = self.get_num_mods();    

        let mut mods: Vec<ModInfo> = vec![];
        for m in 0..self.mods_in_cabinet/2 {
            log(&format!("m: {}", m));
            for w in 0..num_mods {
                let letter = &letters[(m % 27) as usize];
                let x = 0 + (w * mod_h);
                let y = m * mod_w;
                let mut txt_x = x + 4;
                if w+1 < 10 {
                    txt_x += 2;
                }
                // let txt_y = y+20;
                mods.push(
                    ModInfo {
                        upper_left_xy: Point{x, y},
                        text_coords: Point{x: txt_x, y: y+20},
                        label: format!("{}{}", letter, w+1),
                    }
                );
            }
        }

        serde_json::to_string(&mods).unwrap()
    }
    
    pub fn width(&self) -> u32 {
        self.get_cabinet_width() * self.num_cabinets
    }

    pub fn height(&self) -> u32 {
        self.get_cabinet_height()
    }
}