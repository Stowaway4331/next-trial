import Image from "next/image";
import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { LoginButton } from "./utils/LoginButton";

import styles from "./page.module.css";
import { redirect } from "next/navigation";

// import SideBar from "./components/sidebar/SideBar";
// import Header from "./components/header/Header";

export default async function Home() {
  const session = await getServerSession(options);
  // const session = null;

  session ? redirect("/dashboard") : redirect("/login");

  return (
    <p className="mt-8 text-center">Redirecting...</p>

    // <>
    //   {session ? (
    //     <main className={styles.main}>
    //       <div className={styles.description}>
    //         {/* <p className="text-center">
    //           You are logged in as&nbsp;
    //           <code className={styles.code}>Jeremie Dsouza</code>
    //           <LoginButton />
    //         </p> */}
    //         <LoginButton />
    //         <div>
    //           <a
    //             href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //             target="_blank"
    //             rel="noopener noreferrer"
    //           >
    //             By{" "}
    //             <Image
    //               src="/vercel.svg"
    //               alt="Vercel Logo"
    //               className={styles.vercelLogo}
    //               width={100}
    //               height={24}
    //               priority
    //             />
    //           </a>
    //         </div>
    //       </div>

    //       <div className={styles.center}>
    //         <Image
    //           className={styles.logo}
    //           src="/next.svg"
    //           alt="Next.js Logo"
    //           width={180}
    //           height={37}
    //           priority
    //         />
    //       </div>

    //       <div className={styles.grid}>
    //         <a
    //           href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //           className={styles.card}
    //           target="_blank"
    //           rel="noopener noreferrer"
    //         >
    //           <h2>
    //             Docs <span>-&gt;</span>
    //           </h2>
    //           <p>Find in-depth information about Next.js features and API.</p>
    //         </a>

    //         <a
    //           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //           className={styles.card}
    //           target="_blank"
    //           rel="noopener noreferrer"
    //         >
    //           <h2>
    //             Learn <span>-&gt;</span>
    //           </h2>
    //           <p>
    //             Learn about Next.js in an interactive course with&nbsp;quizzes!
    //           </p>
    //         </a>

    //         <a
    //           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //           className={styles.card}
    //           target="_blank"
    //           rel="noopener noreferrer"
    //         >
    //           <h2>
    //             Templates <span>-&gt;</span>
    //           </h2>
    //           <p>Explore the Next.js 13 playground.</p>
    //         </a>

    //         <a
    //           href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //           className={styles.card}
    //           target="_blank"
    //           rel="noopener noreferrer"
    //         >
    //           <h2>
    //             Deploy <span>-&gt;</span>
    //           </h2>
    //           <p>
    //             Instantly deploy your Next.js site to a shareable URL with
    //             Vercel.
    //           </p>
    //         </a>
    //       </div>
    //     </main>
    //   ) : (
    //     <main className={styles.main}>
    //       <div className={styles.description}>
    //         <section className="w-full flex justify-center">
    //           <p className="text-center">
    //             You are not signed in.&nbsp;
    //             {/* <code className={styles.code}>Jeremie Dsouza</code> */}
    //             <LoginButton />
    //           </p>
    //         </section>
    //       </div>
    //     </main>
    //   )}
    // </>
  );
}
