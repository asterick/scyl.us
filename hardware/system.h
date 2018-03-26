#pragma once

#define RAM_BASE 	0x00000000
#define ROM_BASE 	0x1FC00000

#define RAM_SIZE 	0x00400000 // 4MB
#define ROM_SIZE 	0x00080000 // 512KB

#define DMA_BASE    0x1F000000
#define TIMER_BASE 	0x1F100000
#define CEDAR_BASE 	0x1F200000
#define GPU_BASE 	0x1F300000
#define DSP_BASE 	0x1F400000
#define SPU_BASE 	0x1F500000

#define KERNEL_UNMAPPED 0xA0000000

enum SystemIRQ {
	DMA_IRQn,
	GPU_IRQn
};

#include "dma.h"
#include "gpu.h"
