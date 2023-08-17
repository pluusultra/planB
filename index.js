const buttonNewTask = document.querySelector('.new-task');
const popupChoiceOptions = document.querySelector('#add-choice');
const popupList = document.querySelectorAll('.popup');
const optionList = document.querySelectorAll('.add-choice__option');
const popupTask = document.querySelector('#add-task');
const formAddActivities = document.forms['newActivities'];
const cardsContainer = document.querySelector('.cards_container');
const newActivitiesCard = document
  .querySelector('#cardTemplate')
  .content.querySelector('.activities');

buttonNewTask.addEventListener('click', function () {
  openPopup(popupChoiceOptions);
});

function openPopup(popupName) {
  popupName.classList.add('popup_opened');
  document.body.addEventListener('keydown', closePopupByEsc);
}

function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
  document.body.removeEventListener('keydown', closePopupByEsc);
}

function closePopupByEsc(evt) {
  popupList.forEach(item => {
    if (evt.key === 'Escape') {
      closePopup(item);
    }
  });
}

function closePopupByCrossAndOverlay(popupList) {
  popupList.forEach(item => {
    item.addEventListener('mousedown', evt => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(item);
      }
    });
  });
}

function addActivities(optionList) {
  optionList.forEach(item => {
    item.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('task')) {
        closePopup(popupChoiceOptions);
        openPopup(popupTask);
      }
    });
  });
}

formAddActivities.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const activitiesName = formAddActivities.elements.activitiesName.value;
  const activitiesDate = formAddActivities.elements.activitiesDate.value;
  const activitiesVariable = formAddActivities.elements.activitiesVariable.value;
  const activitiesText = formAddActivities.elements.activitiesText.value;
  const activitiesTag = formAddActivities.elements.activitiesTag.value;
  const newCard = {
    activitiesName,
    activitiesDate,
    activitiesVariable,
    activitiesText,
    activitiesTag
  };

  const item = createCard(newCard);
  if (activitiesTag === 'personal') {
    item.classList.add('activities_pink');
  }
  if (activitiesTag === 'study') {
    item.classList.add('activities_violet');
  }
  if (activitiesTag === 'work') {
    item.classList.add('activities_beige');
  }
  if (activitiesTag === 'home') {
    item.classList.add('activities_green');
  }
  cardsContainer.append(item);
  formAddActivities.reset();
  closePopup(popupTask);
});

function createCard(item) {
  const newItem = newActivitiesCard.cloneNode(true);
  const activitiesName = newItem.querySelector('.activities__title');
  const activitiesDate = newItem.querySelector('.activities__date');
  const activitiesText = newItem.querySelector('.activities__text');
  const buttonRemoveActivities = newItem.querySelector('.activities__remove');
  buttonRemoveActivities.addEventListener('click', function () {
    newItem.remove();
  });
  activitiesName.textContent = item.activitiesName;
  activitiesDate.textContent = item.activitiesDate;
  activitiesText.textContent = item.activitiesText;
  return newItem;
}

closePopupByCrossAndOverlay(popupList);
addActivities(optionList);
