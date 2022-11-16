import React, { useState } from "react";
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from "react-icons/bs";
import { toast } from "react-toastify";
import styles from "../styles/Index.module.css";
type TextList = Array<{ id: number; text: string; vote: number }>;

export default function Main(): JSX.Element {
  const [text, setText] = useState<string>("");
  const [textList, setTextList] = useState<TextList>([] as TextList);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (text == "") {
      toast.info("Text is empty!!");
    } else {
      setTextList([
        { text: text, id: textList.length + 1, vote: 0 },
        ...textList,
      ]);
      setText("");
    }
  };
  return (
    <>
      <main className={styles.main}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            placeholder="Enter text"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Submit
          </button>
        </form>

        <div className={styles.listBox}>
          <ul>
            {textList.map((tx) => (
              <li key={tx.id}>
                <div className={styles.textVotes}>
                  <span>{tx.text}</span>
                  <span> {tx.vote} votes</span>
                </div>
                <div className={styles.actionButtons}>
                  {/* upvote */}
                  <button onClick={(e) => {}}>
                    <BsFillArrowDownCircleFill color="red" size="20px" />
                  </button>
                  {/* downvote */}
                  <button onClick={(e) => {}}>
                    <BsFillArrowUpCircleFill color="green" size="20px" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
