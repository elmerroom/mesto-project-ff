// теперь картинки можно импортировать,
// вебпак добавит в переменные правильные пути
import addIcon from '../images/add-icon.svg';
import avatar from '../images/avatar.jpg';
import card1 from '../images/card_1.jpg';
import card2 from '../images/card_2.jpg';
import card3 from '../images/card_3.jpg';
import cclose from '../images/close.svg';
import deleteIcon from '../images/delete-icon.svg';
import editIcon from '../images/edit-icon.svg';
import likeActive from '../images/like-active.svg';
import likeInactive from '../images/like-inactive.svg';
import logo from '../images/logo.svg';
import './pages/index.css';


const whoIsTheGoat = [
  // меняем исходные пути на переменные
  { name: 'addIcon', link: addIcon },
  { name: 'avatar', link: avatar },
  { name: 'card1', link: card1 },
  { name: 'card2', link: card2 },
  { name: 'card3', link: card3 },
  { name: 'cclose', link: cclose },
  { name: 'deleteIcon', link: deleteIcon },
  { name: 'editIcon', link: editIcon },
  { name: 'likeActive', link: likeActive },
  { name: 'likeInactive', link: likeInactive },
  { name: 'logo', link: logo },
]; 

const numbers = [2, 3, 5];

const doubledNumbers = numbers.map(number => number * 2);

console.log(doubledNumbers);