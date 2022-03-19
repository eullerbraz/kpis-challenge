const {
  collection,
  getDocs,
  addDoc,
} = require('firebase/firestore');

const db = require('./connection');

const getAll = async () => {
  const answersCollection = collection(db, 'answers');
  const answersSnapshot = await getDocs(answersCollection);
  const answersList = answersSnapshot.docs.map(doc => doc.data());
  return answersList;
}

const create = async (answer) => {
  await addDoc(collection(db, "answers"), answer);
  return answer;
}

module.exports = {
  getAll,
  create,
}
