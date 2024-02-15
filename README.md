# NodeJS Sorting Algorithms Performance Comparison

This repository contains code and discussions related to the performance comparison of various sorting algorithms implemented in different languages, with a focus on NodeJS and C.

## Overview

In this project, we explore the efficiency and performance of different sorting algorithms implemented in Node.js and C. We compare custom implementations of sorting algorithms with built-in sorting functions available in Node.js, as well as explore the usage of compiled binaries and WebAssembly (Wasm) for optimizing performance-critical tasks.

## Usage

To test sorting algorithms and compare their performance, clone the repository and run the provided scripts.

### Compile C code for macOS Apple Silicon

```bash
arch -arch arm64 gcc -o sort_numbers main.c utils.c -lm
chmod +x sort_numbers # sets the executable permission for binary
```

Binary usage:

```bash
./sort_numbers 3 6 1 8 0
```

### Run NodeJS script

```bash
node test-speed.js
```

## Contents

### Node.js Sorting Algorithms:

Implementations of various sorting algorithms such as Bubble Sort, Quick Sort, and Custom Sort in Node.js.
Performance comparisons between custom implementations and built-in sorting functions using console.time().
C Sorting Algorithm:

### Implementation of an efficient sorting algorithm in C.

Compilation of C code into a binary executable for use as a child process in Node.js.

### Node.js Sorting Algorithms:

Implementations of various sorting algorithms such as Bubble Sort, Quick Sort, and Custom Sort in Node.js.
Performance comparisons between custom implementations and built-in sorting functions using console.time().

### C Sorting Algorithm:

Implementation of an efficient sorting algorithm in C.
Compilation of C code into a binary executable for use as a child process in Node.js.

### Child Process Performance Comparison:

Evaluation of the performance of child processes in Node.js for executing CPU-intensive tasks.
Comparison of performance between executing a custom sorting algorithm as a child process and using native Node.js sorting functions.

### WebAssembly (Wasm) Integration:

Exploration of using WebAssembly for optimizing performance-critical tasks in Node.js.
Potential use cases and benefits of using WebAssembly for CPU-intensive operations.

### Takeaway

_So the lesson here is: Use binary-compiled child processes for CPU-intensive tasks, that can't easily be done in native NodeJS, and not for sorting algorithms and things like that?_

_Maybe for things like processing video or merging PDFs, as a compiled binary, is better suited for child processes?_

Yes, that's a reasonable takeaway. Child processes with binary-compiled executables can be highly effective for CPU-intensive tasks that are not easily accomplished within the Node.js runtime environment. Tasks like video processing, PDF manipulation, cryptographic operations, and complex numerical computations are good candidates for offloading to compiled binaries executed via child processes.

Here are some reasons why using compiled binaries in child processes can be beneficial for such tasks:

- Performance: Compiled languages like C, C++, or Rust often offer better performance than interpreted languages like JavaScript. They allow for more efficient memory management and direct access to system resources, resulting in faster execution times.

- Access to Native Libraries: Compiled binaries can easily interface with native libraries and system APIs, providing access to specialized functionality that may not be available or performant in JavaScript.

- Concurrency and Parallelism: Binary executables can take advantage of multi-core processors and parallel execution, leading to improved performance for concurrent tasks.

- Resource Management: Since compiled binaries have more control over system resources, they can handle resource-intensive tasks like video encoding/decoding or image processing more efficiently.

- Portability: Once compiled, binary executables can be distributed and run on various platforms without requiring the end-user to have the source code or dependencies installed.

However, it's essential to weigh the benefits against the overhead of spawning and managing child processes, as well as the complexity of inter-process communication. For simpler tasks or operations already well-supported by Node.js libraries, using JavaScript directly may be more straightforward and sufficient.

#### Lag and Overhead

_Yeah seems like there's a lot of overhead/lag when calling binaries as a child process. Is there a better way to do that?_

Yes, there are alternative approaches to using child processes for executing binary executables, which can help reduce overhead and improve performance in certain scenarios. Here are a few options to consider:

- Native Addons: Instead of spawning a separate process, you can create native addons using C/C++ that directly interface with Node.js. This allows you to leverage the performance benefits of compiled code while integrating seamlessly with your Node.js application. Native addons can be more efficient than spawning child processes because they run within the same V8 runtime as JavaScript code, eliminating the need for inter-process communication.

- WebAssembly (Wasm): WebAssembly is a binary instruction format that enables high-performance execution of code in web browsers and other environments. You can compile code from languages like C, C++, or Rust to WebAssembly and execute it within Node.js using the WebAssembly JavaScript API. While there's still some overhead involved, it can be more efficient than spawning separate processes.

- Shared Memory and Workers: If your application requires parallel execution or data sharing between processes, you can explore using Node.js Worker Threads or the worker_threads module. Worker Threads allow you to create multiple threads within a single Node.js process, enabling parallel computation and communication via shared memory. This approach can be more efficient than spawning separate processes for each task.

- Optimize Inter-Process Communication: If you must use child processes, consider optimizing the communication between the parent and child processes. Use efficient serialization formats like JSON or Protocol Buffers, minimize the amount of data exchanged, and batch requests when possible to reduce overhead. Additionally, consider using streams or message queues for asynchronous communication.

External Services: For computationally intensive tasks that don't require tight integration with your Node.js application, consider offloading the work to external services or cloud-based solutions. This approach can help distribute the workload across multiple machines and scale more effectively.

By evaluating these alternatives and choosing the approach best suited to your specific use case, you can minimize overhead and achieve better performance when executing binary code within a Node.js environment.

#### WASM vs Native Addons

_Which one is easier to build and implement: Native Addons or WASM?_

The ease of building and implementing either Native Addons or WebAssembly (Wasm) depends on several factors, including your familiarity with the technologies involved, the complexity of your application, and your specific requirements. Here's a comparison to help you decide which option might be easier for you:

##### Native Addons:

Ease of Implementation: If you're already comfortable with C/C++ programming and have experience with Node.js addons, building native addons can be relatively straightforward.

- Integration: Native addons integrate seamlessly with Node.js and allow you to call C/C++ code directly from your JavaScript code, making it easy to extend your Node.js applications.

- Performance: Native addons can offer high performance because they run within the same V8 runtime as JavaScript code, allowing for efficient memory access and reduced overhead compared to spawning separate processes.

##### WebAssembly (Wasm):

- Ease of Implementation: WebAssembly can be easier to implement if you're more familiar with languages like C, C++, or Rust than with writing Node.js addons. Tools like Emscripten or AssemblyScript can simplify the process of compiling code to Wasm.

- Portability: Wasm modules are portable and can run in any environment that supports WebAssembly, not just Node.js. This can be beneficial if you need to run your code in web browsers or other platforms.

- Interoperability: While Wasm modules can be integrated with Node.js using the WebAssembly JavaScript API, there may be some additional complexity compared to native addons. You'll need to manage memory, handle asynchronous calls, and potentially deal with differences in data types between JavaScript and Wasm.

In summary, if you're already comfortable with C/C++ and Node.js addons, building a native addon may be the easier option for integrating compiled code into your Node.js applications. On the other hand, if you prefer languages like C/C++ or Rust and want the flexibility of running your code in different environments, WebAssembly could be a more suitable choice. Ultimately, the best option depends on your specific skills, requirements, and preferences.

#### Using Go for WASM or Addons

_Can Go be used for WASM or Native Addons?_

Yes, Go can be used for both WebAssembly (Wasm) and Native Addons, although the approach differs slightly for each:

##### WebAssembly (Wasm):

Go has built-in support for compiling to WebAssembly, making it relatively straightforward to create Wasm modules from Go code.
You can use the `GOARCH=wasm` environment variable along with the `GOOS=js` environment variable to compile Go code to WebAssembly.
Go's support for Wasm allows you to write code in Go and compile it to a format that can be executed in web browsers or other environments that support Wasm.

##### Native Addons:

Go can also be used to build native addons for Node.js, although the process is a bit more involved compared to using C/C++.
Tools like cgo allow you to call C functions from Go, which can be useful for integrating with existing C libraries used in Node.js addons.

However, building native addons with Go requires additional setup and may not be as well-supported as using C/C++.
In summary, Go can be used for both WebAssembly and Native Addons, but the approach and ease of implementation may vary depending on your specific requirements and familiarity with the technologies involved. If your goal is to integrate Go code into a Node.js application, you may want to consider whether WebAssembly or native addons better suit your needs and development preferences.
