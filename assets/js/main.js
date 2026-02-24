function normalizeToArray(data) {
    if (Array.isArray(data)) return data
    if (data === undefined || data === null) return []
    return [data]
}


function updateProfileInfo(profileData) {
    const photo = document.getElementById('profile.photo')
    photo.src = profileData.photo
    photo.alt = profileData.name

    const name = document.getElementById('profile.name')
    name.innerText = profileData.name

    const job = document.getElementById('profile.job')
    job.innerText = profileData.job

    const location = document.getElementById('profile.location')
    location.innerText = profileData.location

    const phone = document.getElementById('profile.phone')
    phone.innerText = profileData.phone
    phone.href = `tel:${profileData.phone}`

    const email = document.getElementById('profile.email')
    email.innerText = profileData.email
    email.href = `mailto:${profileData.email}`
}

function updateMe(profileData) {
    const sobreMim = document.getElementById('profile.me')
    sobreMim.innerHTML = profileData.me.map(texto => texto.split(`\n`) .map(me => `<p>${me}</p>`).join('')).join('')
}

function updateSoftSkills(profileData) {
    const softSkills = document.getElementById('profile.skills.softSkills')

    softSkills.innerHTML = profileData.skills.softSkills.map(skill => `<li>${skill}</li>`).join('')
}

function updateHardSkills(profileData) {
    const hardSkills = document.getElementById('profile.skills.hardSkills')

    hardSkills.innerHTML = profileData.skills.hardSkills.map(skill => `<li><img src="${skill.logo}" alt="${skill.name}" title="${skill.name}"></li>`).join('')
}

function updateLanguages(profileData) {
    const languages = document.getElementById('profile.languages')
    languages.innerHTML = profileData.languages.map(language => `<li>${language}</li>`).join('')
}

function updateEducation(profileData) {
    const education = document.getElementById('profile.education')

    const items = normalizeToArray(profileData.education)
    education.innerHTML = items.map(item => {
        if (typeof item === 'string') {
            return `<li><h3>${item}</h3></li>`
        }
        return `
            <li>
                <h3>${item.name}</h3>
                <p>${item.institution}</p>
                <p>${item.period}</p>
            </li>
        `
    }).join('')
}

function updateProjetos(profileData) {
    const projetos = document.getElementById('profile.projetos')

    projetos.innerHTML = profileData.projetos.map(project => {
        return `
            <li>
                <h3 ${project.github ? 'class="github"' : ''}>${project.name}</h3>
                <a href="${project.url}" target="_blank">${project.url}</a>
            </li>
        `
    }).join('')
}

function updateProfessionalExperience(profileData) {
    const professionalExperience = document.getElementById('profile.professionalExperience')
    professionalExperience.innerHTML = profileData.professionalExperience.map(experience => {
        return `
            <li>
                <h3 class="title">${experience.name}</h3>
                <p class="period">${experience.period}</p>
                <p>${experience.description}</p>
            </li>
        `
    }).join('')
}


(async () => {
    
    const profileData = await fetchProfileData()
    updateProfileInfo(profileData)
    updateMe(profileData)
    updateSoftSkills(profileData)
    updateHardSkills(profileData)
    updateLanguages(profileData)
    updateEducation(profileData)
    updateProjetos(profileData)
    updateProfessionalExperience(profileData)
})()