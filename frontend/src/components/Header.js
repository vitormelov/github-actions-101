import GitHubLogo from "../assets/GitHubLogo";

export default function Header() {
  return (
    <header className="flex flex-col justify-center items-center pt-20">
      <GitHubLogo color="#2d2d3f" width={400} height={106} />
      <h2 className="text-7xl">GitHub Actions 101</h2>
    </header>
  );
}
