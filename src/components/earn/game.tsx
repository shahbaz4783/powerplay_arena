import Link from "next/link";

export function Game() {
  return (
    <>
      <div className="border p-4">
        <Link href={"/miniapp/game"}>
          <button>Play Now</button>
        </Link>
      </div>
    </>
  );
}
