import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBQ2XaUasz_pmafsWFHs9zVciWfPDdzUPY",
    authDomain: "quizbee-ee832.firebaseapp.com",
    projectId: "quizbee-ee832",
    storageBucket: "quizbee-ee832.firebasestorage.app",
    messagingSenderId: "11218243419",
    appId: "1:11218243419:web:446e5a6b3e7657d5e9947e"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const scienceQuestions = async () => {
    const questionIds = [
        'question-answer-001', 'question-answer-002', 'question-answer-003',
        'question-answer-004', 'question-answer-005', 'question-answer-006',
        'question-answer-007', 'question-answer-008', 'question-answer-009',
        'question-answer-010', 'question-answer-011', 'question-answer-012',
        'question-answer-013', 'question-answer-014', 'question-answer-015',

    ];

    const questions = [];
    try {
        for (const questionId of questionIds) {
            const docRef = doc(db, 'science', questionId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                questions.push({
                    id: questionId,
                    question: data.question,
                    answerA: data.answerA,
                    answerB: data.answerB,
                    answerC: data.answerC,
                    answerD: data.answerD,
                    correctAnswer: data.correctAnswer
                });
            }
        }
        return questions;
    } catch (error) {
        console.error('Error fetching questions:', error);
        return [];
    }
};

export { scienceQuestions };
