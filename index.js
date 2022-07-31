const fileInput = document.querySelector('.file-input'),
	filterOptions = document.querySelectorAll('.filter button'),
	filterName = document.querySelector('.filter-info .name'),
	filterValue = document.querySelector('.filter-info .value'),
	filterSlider = document.querySelector('.slider input'),
	previewImg = document.querySelector('.preview-img img'),
	chooseImgBtn = document.querySelector('.choose-img')

let brightness = 100,
	saturation = 100,
	inversion = 0,
	grayscale = 0

const applyFilter = () => {
	console.log('applyFilter')
	previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
}

const loadImage = () => {
	let file = fileInput.files[0] // 获取用户选择的图片
	if (!file) return // 如果没有选择，return 出去
	// console.log(file)
	previewImg.src = URL.createObjectURL(file)
	previewImg.addEventListener('load', () => {
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

fileInput.addEventListener('change', loadImage)

filterSlider.addEventListener('input', updateFilter)

chooseImgBtn.addEventListener('click', () => {
	fileInput.click()
})
