typedef unsigned int size_t;

typedef unsigned int uint32_t;
typedef unsigned short uint16_t;
typedef unsigned char uint8_t;

typedef signed int int32_t;
typedef signed short int16_t;
typedef signed char int8_t;

#include "system.h"

volatile uint32_t DATA[] = {
	0xDEADFACE,
	0xCAFEBABE,
	0x01234567
};

void* memcpy(void* dst, const void* src, size_t n) {
	uint32_t source = (uint32_t)src;
	uint32_t target = (uint32_t)dst;

	if ((3 & source) == (target & 3)) {
		while (source & 3) {
			if (n-- <= 0) return dst;
			*(uint8_t*)(target++) = *(const uint8_t*)(source++);
		}

		DMA_Channels[0].source = (uint32_t) source;
		DMA_Channels[0].target = (uint32_t) target;
		DMA_Channels[0].repeats = 1;
		DMA_Channels[0].length = n / 4;
		DMA_Channels[0].flags = 0
			| DMA_TRIGGER_NONE 
			| DMA_WIDTH_BIT32 
			| DMACR_ACTIVE_MASK 
			| (4 << DMACR_SSTRIDE_POS)
			| (4 << DMACR_TSTRIDE_POS)
			;

		source += n & ~3;
		target += n & ~3;
		n &= 3;
	} else if ((source & 1) ^ (target & 1)) {
		while (source & 1) {
			if (n-- <= 0) return dst;
			*(uint8_t*)(target++) = *(const uint8_t*)(source++);
		}

		DMA_Channels[0].source = (uint32_t) source;
		DMA_Channels[0].target = (uint32_t) target;
		DMA_Channels[0].repeats = 1;
		DMA_Channels[0].length = n / 2;
		DMA_Channels[0].flags = 0
			| DMA_TRIGGER_NONE 
			| DMA_WIDTH_BIT16
			| DMACR_ACTIVE_MASK 
			| (4 << DMACR_SSTRIDE_POS)
			| (4 << DMACR_TSTRIDE_POS)
			;
		source += n & ~1;
		target += n & ~1;
		n &= 1;
	} else {
		DMA_Channels[0].source = (uint32_t) source;
		DMA_Channels[0].target = (uint32_t) target;
		DMA_Channels[0].repeats = 1;
		DMA_Channels[0].length = n;
		DMA_Channels[0].flags = 0
			| DMA_TRIGGER_NONE 
			| DMA_WIDTH_BIT8
			| DMACR_ACTIVE_MASK 
			| (4 << DMACR_SSTRIDE_POS)
			| (4 << DMACR_TSTRIDE_POS)
			;
		
		n = 0;
	}

	while (n-- > 0) {
		*(uint8_t*)(target++) = *(const uint8_t*)(source++);
	}

	while (DMA_Channels[0].flags & DMACR_ACTIVE_MASK) ;

	return dst;
}

int main(void) {
	// TODO
}
