import {
  type NewAssment,
  type ObjectiveQuestion,
  type Question,
} from "@/api/assments/schema";
import { nanoid } from "nanoid";
import { type FC } from "react";
import { useFormContext } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface QuestionsProps {
  questionIndex: number;
  questionId: Question["id"];
  removeQuestion: (id: Question["id"]) => void;
}

const Questions: FC<QuestionsProps> = ({
  questionId,
  questionIndex,
  removeQuestion,
}) => {
  const form = useFormContext<NewAssment>();
  return (
    <Form {...form}>
      <div className="flex flex-col gap-2 mt-2 border-l-8 ps-4 py-2 border rounded-lg pr-2 border-blue-300">
        <FormField
          control={form.control}
          name={`questions.${questionIndex}.question_text`}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 ">
              <header className="flex items-center justify-between my-2">
                <FormLabel asChild>
                  <label className="text-sm font-medium" htmlFor={field.name}>
                    Question {questionIndex + 1}
                  </label>
                </FormLabel>
                <button
                  type="button"
                  onClick={() => removeQuestion(questionId)}
                  className="bg-red-500 py-1 px-3 rounded-md text-white"
                >
                  Remove Question
                </button>
              </header>
              <FormControl>
                <textarea
                  {...field}
                  rows={3}
                  id={field.name}
                  placeholder="Enter assessment description"
                  className="bg-white border text-sm border-gray-300 p-1 rounded-md"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`questions.${questionIndex}.marks`}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel asChild>
                <label className="text-sm font-medium" htmlFor={field.name}>
                  Marks Allotted
                </label>
              </FormLabel>
              <FormControl>
                <input
                  {...field}
                  type="number"
                  id={field.name}
                  className="border bg-white border-gray-300 text-sm p-1 rounded-md"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`questions.${questionIndex}.question_type`}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel asChild>
                <label className="text-sm font-medium" htmlFor={field.name}>
                  Question Type
                </label>
              </FormLabel>
              <FormControl>
                <select
                  {...field}
                  id={field.name}
                  className="border bg-white border-gray-300 text-sm p-1 rounded-md"
                >
                  <option value="objective">Objective</option>
                  <option value="subjective">Subjective</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.getValues().questions[questionIndex].question_type ===
          "objective" && (
          <FormField
            control={form.control}
            name={`questions.${questionIndex}.options`}
            render={({ field: optionsField }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel asChild>
                  <label className="text-sm font-medium" htmlFor="options">
                    Options
                  </label>
                </FormLabel>
                <FormControl>
                  {optionsField.value.map((option, optionIndex) => (
                    <div className="flex gap-1 items-center" key={option._id}>
                      <FormField
                        control={form.control}
                        name={`questions.${questionIndex}.options.${optionIndex}.option_text`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <input
                                {...field}
                                className="bg-white border border-gray-300 p-1 rounded-md flex-1"
                                placeholder={`Option ${optionIndex + 1}`}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`questions.${questionIndex}.options.${optionIndex}.is_correct`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <input
                                {...field}
                                type="radio"
                                value={undefined}
                                checked={field.value}
                                onChange={(e) =>
                                  field.onChange(e.target.checked)
                                }
                                name={questionId}
                                placeholder={`Option ${optionIndex + 1}`}
                                className="bg-white border border-gray-300 p-1 rounded-md flex-1"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <button
                        type="button"
                        className="bg-red-500 text-white p-1 rounded-md"
                        onClick={() =>
                          optionsField.onChange(
                            optionsField.value.filter(
                              (item) => item._id != option._id,
                            ),
                          )
                        }
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </FormControl>
                <FormMessage />
                <button
                  type="button"
                  className="bg-blue-600 w-fit text-white p-1 rounded-md mt-1"
                  onClick={() => {
                    optionsField.onChange([
                      ...optionsField.value,
                      {
                        _id: nanoid(10),
                        is_correct: false,
                        option_text: "",
                      },
                    ] satisfies ObjectiveQuestion["options"]);
                  }}
                >
                  Add Option
                </button>
              </FormItem>
            )}
          />
        )}
      </div>
    </Form>
  );
};

export default Questions;
