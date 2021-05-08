# LLJSVM-ASM
* LLJSVM-ASM is an assembler tool that uses some of Low Level JavaScript's 16-Bit Virtual Machine code
* in order to produce machine code via terminal for that VM.

* Links to Low Level JavaScript's
    * [Youtube](https://www.youtube.com/channel/UC56l7uZA209tlPTVOJiJ8Tw)
    * [GitHub](https://github.com/LowLevelJavaScript)
    * [16-Bit VM](https://github.com/LowLevelJavaScript/16-Bit-Virtual-Machine)

To install the CLI tool use:
> npm i -g lljsvm-asm

Use:
> lljsvm-asm {source file} {output file} {symbols file(JSON Object)} {Data offset}

### Every argument except for the source file has a default value:

* Output: "bin.bin"
* Symbols: "symbols.json"
* Data offset: 0

