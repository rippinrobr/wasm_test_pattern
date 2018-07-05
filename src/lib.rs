#![feature(proc_macro, wasm_custom_section, wasm_import_module)]
#![cfg_attr(feature = "wee_alloc", feature(global_allocator))]

extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;
#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub struct Stripe {
    mod_h: u32,
    mod_w: u32,
    num_cabinets: u32
}

#[wasm_bindgen]
impl Stripe {

    pub fn new(mod_w: u32, mod_h: u32, cab_count: u32) -> Stripe {
        Stripe {
            mod_h : mod_h,
            mod_w : mod_w,
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
    
    pub fn width(&self) -> u32 {
        self.get_cabinet_width() * self.num_cabinets
    }

    pub fn height(&self) -> u32 {
        self.get_cabinet_height()
    }
}