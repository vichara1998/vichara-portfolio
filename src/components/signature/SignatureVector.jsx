import { useRef } from "react";
import { useInView } from "framer-motion";
import "./Signature.css";

export default function SignatureVector() {
  const signatureRef = useRef(null);
  const isInView = useInView(signatureRef, { amount: 0.2 });

  return (
    <div
      ref={signatureRef}
      className={`signature-container mt-5${isInView ? " is-visible" : ""}`}
      aria-hidden="true"
    >
      <svg className="signature-vector" viewBox="165 125 480 350">
        <path className="entry" pathLength="1" d="M 307 357 C 311 337, 298 293, 273 248 C 251 208, 226 167, 229 157 C 241 144, 273 192, 291 239 C 309 283, 317 329, 307 357" />
        <path className="upper-sweep" pathLength="1" d="M 201 330 C 230 293, 289 234, 339 194 C 360 177, 384 166, 386 170 C 391 175, 348 216, 322 244 C 283 290, 257 340, 245 363" />
        <path className="middle-loop" pathLength="1" d="M 245 363 C 272 321, 314 275, 347 271 C 360 267, 357 278, 351 286 C 337 311, 318 339, 307 357" />
        <path className="carry" pathLength="1" d="M 307 357 C 321 380, 339 397, 356 404 C 366 409, 375 359, 389 304 C 395 280, 398 268, 398 276 C 404 307, 388 328, 413 329 C 429 331, 455 293, 473 261 C 469 283, 490 278, 513 257 C 542 233, 552 207, 573 194 C 579 193, 563 217, 561 222 C 568 235, 589 213, 601 211" />
        <path className="underline" pathLength="1" d="M 298 452 C 327 429, 344 406, 373 383 C 431 330, 495 278, 553 238 C 573 224, 591 217, 601 212" />
        <path className="dot" pathLength="1" d="M 440 386 C 441 380, 449 374, 453 375 C 459 379, 454 385, 450 386" />
      </svg>
    </div>
  );
}
