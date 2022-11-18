import React, { useState } from "react";
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from "react-icons/bs";
import { toast } from "react-toastify";
import styles from "../styles/Index.module.css";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { fetchUpvotes, postUpvote, updateUpvote } from "../services/upvote";

export type TextList = Array<{ id: number; text: string; vote: number }>;
type upvote = {
  id: number;
  text: string;
  vote: number;
};

export default function Main(): JSX.Element {
  const queryClient = useQueryClient();
  const [text, setText] = useState<string>("");
  // const [textList, setTextList] = useState<TextList>([] as TextList);

  const { isError, isSuccess, isLoading, data, error } = useQuery(
    ["upvotes"],
    fetchUpvotes,
    { staleTime: 60000 }
  );

  const AddMutation = useMutation(postUpvote, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["upvotes"] });
      // queryClient.refetchQueries("upvotes", { force: true });
    },
  });
  const UpdateMutation = useMutation(updateUpvote, {
    onSuccess: (
      data: { id: number; text: string; vote: number },
      variables
    ) => {
      // console.log(data);
      // console.log(variables);
      // queryClient.setQueryData(["upvotes", { id: data.id }], (oldData) =>
      //   oldData
      //     ? {
      //         ...oldData,
      //         vote: data.vote,
      //       }
      //     : oldData
      // );
      queryClient.invalidateQueries({ queryKey: ["upvotes"] });
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (text == "") {
      toast.info("Text is empty!!");
    } else {
      AddMutation.mutate({ text: text, vote: 0 });
      setText("");
    }
  };
  const handleDownVoteAction = (data: { id: number; vote: number }) => {
    UpdateMutation.mutate({ id: data.id, vote: data.vote - 1 });
  };
  const handleUpvoteAction = (data: { id: number; vote: number }) => {
    UpdateMutation.mutate({ id: data.id, vote: data.vote + 1 });
  };

  const [selectedItem, setSelectedItem] = useState(0);
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
          <ul className={styles.unordered}>
            {isLoading || AddMutation.isLoading ? (
              <li>Loading...</li>
            ) : isError || AddMutation.isError ? (
              <li>Error...</li>
            ) : (
              data.map((tx: upvote) => (
                <li key={tx.id}>
                  <div className={styles.textVotes}>
                    <span className={styles.text}>{tx.text}</span>
                    <div className={styles.votesAndLoading}>
                    <span>
                      {UpdateMutation.isLoading && selectedItem === tx.id && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          style={{
                            margin: "auto",
                            background: "none",
                            display: "block",
                            shapeRendering: "auto",
                          }}
                          width="20px"
                          height="20px"
                          viewBox="0 0 100 100"
                          preserveAspectRatio="xMidYMid"
                        >
                          <path
                            d="M7 50A43 43 0 0 0 93 50A43 47 0 0 1 7 50"
                            fill="#e15b64"
                            stroke="none"
                          >
                            <animateTransform
                              attributeName="transform"
                              type="rotate"
                              dur="0.46511627906976744s"
                              repeatCount="indefinite"
                              keyTimes="0;1"
                              values="0 50 52;360 50 52"
                            ></animateTransform>
                          </path>
                        </svg>
                      )}
                    </span>
                    <span> {tx.vote} votes</span>
                    </div>
                  </div>

                  <div className={styles.actionButtons}>
                    <BsFillArrowDownCircleFill
                      color="red"
                      // size="20px"
                      className={styles.down}
                      onClick={(e) => {
                        handleDownVoteAction({ id: tx.id, vote: tx.vote });
                        setSelectedItem(tx.id);
                      }}
                    />

                    {/* downvote */}

                    <BsFillArrowUpCircleFill
                      color="green"
                      // size="20px"
                      className={styles.up}
                      onClick={(e) => {
                        handleUpvoteAction({ id: tx.id, vote: tx.vote });
                        setSelectedItem(tx.id);
                      }}
                    />
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </main>
    </>
  );
}
