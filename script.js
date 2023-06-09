const tagsEl = document.getElementById('tags')
const textarea = document.getElementById('textarea')

// automatically focus on text area
textarea.focus()

textarea.addEventListener('keyup', (e) => {
  createTags(e.target.value)

  // check to see if we hit enter
  if (e.key === 'Enter') {
    // clear the input area after 10ms
    setTimeout(() => {
      e.target.value = ''
    }, 10)

    randomSelect()
  }
})

function createTags(input) {
  const tags = input
    .split(',')
    .filter((tag) => tag.trim() !== '')
    .map((tag) => tag.trim())

  tagsEl.innerHTML = ''

  // loop through each array
  tags.forEach((tag) => {
    const tagEl = document.createElement('span')
    tagEl.classList.add('tag')
    tagEl.innerText = tag
    tagsEl.appendChild(tagEl)
  })
}

// create random select
function randomSelect() {
  const times = 30

  const interval = setInterval(() => {
    const randomTag = pickRandomTag()

    if (randomTag !== undefined) {
      highlightTag(randomTag)

      setTimeout(() => {
        unHighlightTag(randomTag)
      }, 100)
    }
  }, 100)

  setTimeout(() => {
    clearInterval(interval)

    setTimeout(() => {
      const randomTag = pickRandomTag()

      highlightTag(randomTag)
    }, 100)
  }, times * 100)
}

function pickRandomTag() {
  const tags = document.querySelectorAll('.tag')
  return tags[Math.floor(Math.random() * tags.length)]
}

// add highlight tag function
function highlightTag(tag) {
  tag.classList.add('highlight')
}

// remove highlight tag function
function unHighlightTag(tag) {
  tag.classList.remove('highlight')
}
