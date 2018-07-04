//! My awesome Rust and WebAssembly project!

#![feature(proc_macro, wasm_custom_section, wasm_import_module)]
#![cfg_attr(feature = "wee_alloc", feature(global_allocator))]

// #[macro_use]
// extern crate cfg_if;

// cfg_if! {
//     // When the `console_error_panic_hook` feature is enabled, we can call the
//     // `set_panic_hook` function to get better error messages if we ever panic.
//     if #[cfg(feature = "console_error_panic_hook")] {
//         extern crate console_error_panic_hook;
//         use console_error_panic_hook::set_once as set_panic_hook;
//     } else {
//         #[inline]
//         fn set_panic_hook() {}
//     }
// }

// cfg_if! {
//     // When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
//     // allocator.
//     if #[cfg(feature = "wee_alloc")] {
//         extern crate wee_alloc;
//         #[global_allocator]
//         static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
//     }
// }

extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;

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

    // pub fn create(self) -> image::DynamicImage {
    //     let cab_width = self.get_cabinet_width();
    //     let cab_height = self.get_cabinet_height();

    //     let my_img = ImageBuffer::from_fn(self.width().clone(), self.height().clone(), |x, y| {
    //         if x % cab_width == 0 {
    //             image::Luma([0u8])
    //         } else {
    //             if y % cab_height == 0 {
    //                 image::Luma([0u8])
    //             } else {
    //                 image::Luma([205u8])
    //             }
    //         }
    //     });

    //     image::ImageLuma8(my_img)
    //     // let imgbuf = image::ImageBuffer::new(self.width(), self.height());
    //     // image::ImageRgb8(imgbuf)
    // }

    // // a cabinet width is equal to two mods so I calc the width of a cabinet
    // // first then * multiple the products from that calc to get the width 
    // // in pixels
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