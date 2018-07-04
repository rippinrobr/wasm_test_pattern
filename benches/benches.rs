#![feature(test)]

extern crate wasm_test_pattern;
extern crate test;

use wasm_test_pattern::Counter;

#[bench]
fn benches_in_the_benches_dir_work(b: &mut test::Bencher) {
    let mut c = Counter::new();
    b.iter(|| {
        c.increment();
    });
}
