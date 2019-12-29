package panda3.model;

import java.util.List;

public class Question {
    private String questionName;
    private String type;
    private List<String> answers;

    public Question(String questionName, String type, List<String> answers) {
        this.questionName = questionName;
        this.type = type;
        this.answers = answers;
    }

    public String getQuestion() {
        return questionName;
    }

    public void setQuestion(String questionName) {
        this.questionName = questionName;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<String> getAnswers() {
        return answers;
    }

    public void setAnswers(List<String> answers) {
        this.answers = answers;
    }
}
