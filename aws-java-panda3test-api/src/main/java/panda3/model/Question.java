package panda3.model;

import java.util.List;

public class Question {
    private String question;
    private String type;
    private List<String> answersToChoose;

    public Question(String question, String type, List<String> answersToChoose) {
        this.question = question;
        this.type = type;
        this.answersToChoose = answersToChoose;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<String> getAnswersToChoose() {
        return answersToChoose;
    }

    public void setAnswersToChoose(List<String> answersToChoose) {
        this.answersToChoose = answersToChoose;
    }
}
