// Import the functions you need from the SDKs you need
const {
  collection,
  getDocs,
  addDoc,
} = require('firebase/firestore');

const db = require('./connection');

const getAll = async () => {
  const questionsCollection = collection(db, 'questions');
  const questionsSnapshot = await getDocs(questionsCollection);
  const questionsList = questionsSnapshot.docs.map(doc => doc.data());
  return questionsList;
}

const create = async (question) => {
  await addDoc(collection(db, "questions"), question);
  return question;
}

module.exports = {
  getAll,
  create,
}
