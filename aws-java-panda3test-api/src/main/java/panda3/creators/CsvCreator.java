package panda3.creators;

import com.opencsv.bean.CsvConverter;
import org.apache.kafka.common.protocol.types.Field;
import panda3.model.Question;

import java.util.List;

public class CsvCreator {
    public static String ConvertQuestionToCsV(Question question, int questionId, String language){
        String answer = "";
        answer += questionId + ";";
        answer += question.getType() + ";";
        answer += language + ";";
        answer += question.getQuestion() + ";";
        if(question.getType().equals("W"))
            answer += CsvCreator.ConvertAnswerToCsv(question.getAnswers()) + ";";
        else
            answer += "|" + ";";
        return answer;
    }


    public static String ConvertAnswerToCsv(List<String> answers){
        String answer = "";
        for(int i = 0; i < answers.size(); i++){
            answer += answers.get(i);
            if(i != answers.size() - 1)
                answer += "|";
        }
        return answer;
    }
}
