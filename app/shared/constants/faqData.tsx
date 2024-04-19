export const faqData = [
  {
    question: 'How to get a HAR capture?',
    answer: (
      <>
        <p>
          HAR (HTTP Archive) is a file format used by several HTTP session tools to export the captured data. The
          format is basically a JSON object with a particular set of fields. Note that not all the fields in the HAR
          format are mandatory, and in many cases, some information won&apos;t be saved to the file.
        </p>
        <p className="font-semibold">HAR files contain sensitive data!</p>
        <ul className="list-disc list-inside">
          <li>Content of the pages you downloaded while recording.</li>
          <li>Your cookies, which would allow anyone with the HAR file to impersonate your account.</li>
          <li>
            All the information that you submitted while recording: personal details, passwords, credit card numbers, etc.
          </li>
        </ul>
        <p>If needed, you can edit a HAR file in a text editor and redact sensitive information.</p>
      </>
    ),
  },
  {
    question: 'How to get a capture in Internet Explorer/Edge?',
    answer: (
      <>
        <p>
          See detailed instructions in{' '}
          <a
            href="https://docs.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/network"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            Inspect network activity in Microsoft Edge DevTools on the Microsoft website
          </a>
          .
        </p>
        <ol className="list-decimal list-inside">
          <li>Open the Developer Tools from the menu (Menu {">"} More Tools {">"} Developer tools), or by pressing F12 (or Fn-F12) on your keyboard.</li>
          <li>Open the Network tab.</li>
          <li>Look for a round button at the top left of the Network tab. Make sure it&apos;s red. If it&apos;s grey, click it once to start recording.</li>
          <li>Turn on &quot;Preserve log&quot;.</li>
          <li>Reproduce the issue.</li>
          <li>Save the capture by right-clicking on the grid and choosing &quot;Save as HAR with Content&quot;.</li>
        </ol>
        <p>For Internet Explorer, you can also use HttpWatch:</p>
        <ol className="list-decimal list-inside">
          <li>Download and Install HttpWatch.</li>
          <li>Start the HttpWatch capture right before reproducing the issue.</li>
          <li>Stop the HttpWatch capture right after reproducing the issue.</li>
          <li>Export the capture to HAR format.</li>
        </ol>
      </>
    ),
  },
  {
    question: 'How to get a capture in Firefox?',
    answer: (
      <>
        <p>
          Start Firefox Developer Tools in Network mode (Top right menu {">"} Developer {">"} Network, or Ctrl-Shift-E / Cmd-Alt-E on macOS).
        </p>
        <p>Turn on &quot;Persist logs&quot; on the right.</p>
        <p>Reproduce the issue.</p>
        <p>Save the capture by right-clicking on the grid and choosing &quot;Save all as HAR&quot;.</p>
      </>
    ),
  },
  {
    question: 'How to get a capture in Chrome?',
    answer: (
      <>
        <p>
          You can record your HTTP session using the Network tab in the Developer Tools in Chrome.
        </p>
        <ol className="list-decimal list-inside">
          <li>Open the Developer Tools from the menu (Menu {">"} More Tools {">"} Developer tools), or by pressing F12 (or Fn-F12) on your keyboard.</li>
          <li>Click on the Network tab</li>
          <li>Look for a round button at the top left of the Network tab. Make sure it&apos;s red. If it&apos;s grey, click it once to start recording.</li>
          <li>Turn on &quot;Preserve log&quot;.</li>
          <li>
            You can use the clear button (a circle with a diagonal line through it) right before trying to reproduce the issue to remove unnecessary header information.
          </li>
          <li>Reproduce the issue.</li>
          <li>Save the capture by right-clicking on the grid and choosing &quot;Save as HAR with Content&quot;.</li>
        </ol>
      </>
    ),
  },
  {
    question: 'How can I improve and analyze performance using this tool?',
    answer: (
      <>
        <p>
          Improving and analyzing performance using our tool involves a combination of capturing relevant data and utilizing the features provided. Here are some tips:
        </p>
        <ol className="list-decimal list-inside">
          <li>
            <strong>Focus on Critical Requests:</strong> Identify and prioritize critical requests in the captured data. These are the requests impacting page load times the most.
          </li>
          <li>
            <strong>Use Waterfall Charts:</strong> Analyze the waterfall charts to visualize the sequence and timing of each request. Look for bottlenecks and areas for optimization.
          </li>
          <li>
            <strong>Examine Network Timings:</strong> Pay attention to network timings such as DNS resolution, TCP connection, and SSL handshake. Optimize these timings for faster performance.
          </li>
          <li>
            <strong>Inspect Cache Usage:</strong> Check if caching is utilized effectively. Leverage browser caching for static assets to reduce load times for returning visitors.
          </li>
          <li>
            <strong>Minimize and Combine Requests:</strong> Minimize the number of requests by combining files and using techniques like image sprites. This reduces overhead and accelerates page rendering.
          </li>
          <li>
            <strong>Consider Content Delivery Networks (CDN):</strong> Utilize CDNs to distribute static assets geographically, reducing latency and speeding up content delivery.
          </li>
          <li>
            <strong>Optimize Images:</strong> Compress and optimize images to reduce file sizes without compromising quality. Large image files contribute significantly to page load times.
          </li>
          <li>
            <strong>Implement Lazy Loading:</strong> Apply lazy loading for images and other non-essential resources. Loading them only when needed enhances initial page load times.
          </li>
        </ol>
        <p>
          Remember, continuous monitoring and iteration are key to maintaining optimal performance. Regularly analyze captured data, implement improvements, and monitor the impact on your application&apos;s speed.
        </p>
      </>
    ),
  },
];

export default faqData;