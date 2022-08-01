const fileInput = document.querySelector('.file-input'),
	filterOptions = document.querySelectorAll('.filter button'),
	filterName = document.querySelector('.filter-info .name'),
	filterValue = document.querySelector('.filter-info .value'),
	filterSlider = document.querySelector('.slider input'),
	rotateOptions = document.querySelectorAll('.rotate button'),
	previewImg = document.querySelector('.preview-img img'),
	resetFilterBtn = document.querySelector('.reset-filter'),
	chooseImgBtn = document.querySelector('.choose-img'),
	saveImgBtn = document.querySelector('.save-img')

let brightness = 100,
	saturation = 100,
	inversion = 0,
	grayscale = 0

let rotate = 0,
	filpHorizontal = 1,
	filpVertical = 1

const applyFilter = () => {
	previewImg.style.transform = `rotate(${rotate}deg) scale(${filpHorizontal}, ${filpVertical})`
	previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
}

const loadImage = () => {
	let file = fileInput.files[0] // 获取用户选择的图片
	if (!file) return // 如果没有选择，return 出去
	// console.log(file)
	previewImg.src = URL.createObjectURL(file)
	previewImg.addEventListener('load', () => {
		resetFilterBtn.click()
		document.querySelector('.container').classList.remove('disable')
	})
}

filterOptions.forEach((option) => {
	option.addEventListener('click', () => {
		// 给 filter buttons 添加点击事件
		document.querySelector('.filter .active').classList.remove('active')
		option.classList.add('active')
		filterName.innerText = option.innerText
		if (option.id === 'brightness') {
			filterSlider.max = '200'
			filterSlider.value = brightness
			filterValue.innerText = `${brightness}%`
		} else if (option.id === 'saturation') {
			filterSlider.max = '200'
			filterSlider.value = saturation
			filterValue.innerText = `${saturation}%`
		} else if (option.id === 'inversion') {
			filterSlider.max = '100'
			filterSlider.value = inversion
			filterValue.innerText = `${inversion}%`
		} else if (option.id === 'grayscale') {
			filterSlider.max = '100'
			filterSlider.value = grayscale
			filterValue.innerText = `${grayscale}%`
		}
	})
})

const updateFilter = () => {
	filterValue.innerText = filterSlider.value + '%'
	const selectedFilter = document.querySelector('.filter .active')
	if (selectedFilter.id === 'brightness') {
		brightness = filterSlider.value
	} else if (selectedFilter.id === 'saturation') {
		saturation = filterSlider.value
	} else if (selectedFilter.id === 'inversion') {
		inversion = filterSlider.value
	} else if (selectedFilter.id === 'grayscale') {
		grayscale = filterSlider.value
	}
	applyFilter()
}

rotateOptions.forEach((option) => {
	option.addEventListener('click', () => {
		if (option.id === 'left') {
			rotate -= 90
		} else if (option.id === 'right') {
			rotate += 90
		} else if (option.id === 'vertical') {
			filpHorizontal = filpHorizontal === 1 ? -1 : 1
		} else if (option.id === 'horizontal') {
			filpVertical = filpVertical === 1 ? -1 : 1
		}
		applyFilter()
	})
})

const resetFilter = () => {
	brightness = 100
	saturation = 100
	inversion = 0
	grayscale = 0
	rotate = 0
	filpHorizontal = 1
	filpVertical = 1
	filterOptions[0].click()
	applyFilter()
}

const saveImage = () => {
	const canvas = document.createElement('canvas')
	const ctx = canvas.getContext('2d')
	canvas.width = previewImg.naturalWidth
	canvas.height = previewImg.naturalHeight
	ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
	ctx.translate(canvas.width / 2, canvas.height / 2)
	if (rotate) {
		ctx.rotate((rotate * Math.PI) / 180)
	}
	ctx.scale(filpHorizontal, filpVertical)
	ctx.drawImage(
		previewImg,
		-canvas.width / 2,
		-canvas.height / 2,
		canvas.width,
		canvas.height
	)

	// document.body.appendChild(canvas)
	const link = document.createElement('a')
	link.download = 'image.jpeg'
	link.href = canvas.toDataURL()
	link.click()
	document.removeChild(link)
}

fileInput.addEventListener('change', loadImage)

filterSlider.addEventListener('input', updateFilter)

resetFilterBtn.addEventListener('click', resetFilter)

chooseImgBtn.addEventListener('click', () => {
	fileInput.click()
})

saveImgBtn.addEventListener('click', saveImage)
