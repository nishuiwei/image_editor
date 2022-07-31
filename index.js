const fileInput = document.querySelector('.file-input'),
	previewImg = document.querySelector('.preview-img img'),
	chooseImgBtn = document.querySelector('.choose-img')

const loadImage = () => {
	let file = fileInput.files[0] // 获取用户选择的图片
	if (!file) return // 如果没有选择，return 出去
	// console.log(file)
	previewImg.src = URL.createObjectURL(file)
	previewImg.addEventListener('load', () => {
		document.querySelector('.container').classList.remove('disable')
	})
}

fileInput.addEventListener('change', loadImage)
chooseImgBtn.addEventListener('click', () => {
	fileInput.click()
})
