import { InputFiles } from "@/widgets/ui/InputFiles";
import { DropFiles } from "@/widgets/ui/DropFiles";
import { FileReceiver } from "./widgets/ui/FileReceiver";

function App() {
  return (
    <>
      <h1>Hello World</h1>

      <hr />

      <InputFiles />

      <hr />

      <DropFiles />
      <hr />

      <h3>FileReceiver - zip, video all</h3>
      <FileReceiver
        accept="application/zip,image/jpeg,video/*"
        onSelectFiles={(files) => {
          console.log(files);
        }}
      />

      <h3>FileReceiver - all</h3>
      <FileReceiver
        onSelectFiles={(files) => {
          console.log(files);
        }}
      />

      <a href="#">test</a>
    </>
  );
}

export default App;

// import { useState } from "react";

// import viteLogo from "/vite.svg";

// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   );
// }

// export default App;
