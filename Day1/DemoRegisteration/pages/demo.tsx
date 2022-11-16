import axios from "axios";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import styles from "../styles/Demo.module.css";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";

type AppProps = {
  message: string;
};

interface User {
  name: string;
  age: number;
}

type UserList = Array<{ id: number; name: string; age: number }>;

export default function Home({ message }: AppProps): JSX.Element {
  const [userList, setUserList] = useState<UserList>([] as UserList);
  const [user, setUser] = useState<User>({ name: "", age: 0 } as User);

  const fetchUser = async (): Promise<void> => {
    const response = await axios.get(
      "https://636b387dc07d8f936db0905c.mockapi.io/api/guest"
    );
    if (response.status === 200) {
      setUserList(response.data);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const handleOnChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const target = event.target as HTMLTextAreaElement;
    setUser({
      ...user,
      [target?.name]: target?.value,
    });
  };
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    const exist = userList.some((u) => u.name === user.name);
    if (exist) {
      if (confirm("User Already exists! Do you want to update??") === true) {
        const toUpdate: UserList = userList.filter((u) => u.name === user.name);
        const updateData = {
          id: toUpdate[0].id,
          name: user.name,
          age: user.age,
        };
        const updated = await axios.put(
          `https://636b387dc07d8f936db0905c.mockapi.io/api/guest/${toUpdate[0].id}`,
          updateData
        );
        if (updated.status === 200) {
          toast.success("User updated successfully...");
          const updatedUserList: UserList = userList.map((u) =>
            u.id !== updateData.id ? u : updateData
          );
          setUserList(updatedUserList);
          setUser({ name: "", age: 0 });
        }
      }
    } else if (user.name === "" || user.age === 0) {
      alert("please enter your name and age!");
    } else {
      const userWithId = {
        id: userList.length + 1,
        ...user,
      };

      const postedData = await axios.post(
        "https://636b387dc07d8f936db0905c.mockapi.io/api/guest",
        userWithId
      );
      if (postedData.status === 201) {
        setUserList([...userList, userWithId]);
        setUser({ name: "", age: 0 });
        toast.success("New data added successfully");
      }
    }
  };

  const handleDeleteClick = async (user: {
    id: number;
    name: string;
    age: number;
  }): Promise<void> => {
    if (confirm(`Are you sure you want to delete ${user.name}`) === true) {
      const del = await deleteUser(user.id);
      if (del === true) {
        const deletedList = userList.filter((list) => list.id !== user.id);
        setUserList(deletedList);
        toast.success("Deleted successfully..");
      }
    }
  };
  const deleteUser = async (id: number): Promise<Boolean> => {
    const del = await axios.delete(
      `https://636b387dc07d8f936db0905c.mockapi.io/api/guest/${id}`
    );
    if (del?.status === 200) {
      return true;
    }
    return false;
  };
  return (
    <div>
      <Head>
        <title>Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer />
      <main className={styles.main}>
        <form
          className={styles.form}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <h2>Register</h2>
          <label className={styles.label}>Name</label>
          <input
            className={styles.input}
            name="name"
            type="text"
            value={user?.name}
            onChange={handleOnChange}
          />
          <label className={styles.label}>Age</label>
          <input
            className={styles.input}
            name="age"
            type="number"
            value={user?.age}
            onChange={handleOnChange}
          />
          <button className={styles.button} type="submit">
            Register
          </button>
        </form>
        <div className={styles.listHead}>
          <h3 className={styles.listTitle}>Registered Users</h3>
          <ul className={styles.unOrdered}>
            {userList.length > 0 ? (
              userList.map((user, index) => {
                return (
                  <li key={index} className={styles.listItem}>
                    <div>
                      <span
                        onClick={(e) =>
                          setUser({ name: user.name, age: user.age })
                        }
                      >
                        {user.name} of age {user.age}
                      </span>
                      <Image
                        onClick={(e) => handleDeleteClick(user)}
                        // sizes="20px"
                        width="20"
                        height="20"
                        alt={`${user.name} delete`}
                        src={
                          "https://img.icons8.com/color/48/null/delete-forever.png"
                        }
                      />
                    </div>
                  </li>
                );
              })
            ) : (
              <li className={styles.listItem}>No any user registered!</li>
            )}
          </ul>
        </div>
      </main>
    </div>
  );
}
