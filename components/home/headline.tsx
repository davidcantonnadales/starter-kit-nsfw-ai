import Link from "next/link";

const headlineNews = ["NSFW", "Hentai", "text to image", "+18", "Realistic"];

export default function Headline() {
  return (
    <div className="headline-section">
      <ul>
        {/* headline start */}
        {headlineNews?.map((item, i) => (
          <li key={i}>
            <Link href="/">{item}</Link>
          </li>
        ))}
        {/* headline end */}
      </ul>
    </div>
  );
}
