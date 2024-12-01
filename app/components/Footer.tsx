import { socialMediaAccounts } from "@/data/social_accounts";

export default function Footer() {
  return (
    <div className="max-w-3xl w-full mx-auto">
      <div className="py-6 px-4 sm:px-6 lg:px-8 bg-white rounded-md dark:bg-neutral-900">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <div>
            <p className="text-xs text-gray-600 dark:text-neutral-500">
              © {2024} Sahabat Tani Group. Made with ❤️
            </p>
          </div>

          <ul className="flex flex-wrap items-center">
            {socialMediaAccounts.map((e, i) => (
              <SocialAccountItem
                key={`account-${i}`}
                name={e.name}
                link={e.link}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

type SocialAccountProps = {
  link: string;
  name: string;
};

const SocialAccountItem = ({ name, link }: SocialAccountProps) => {
  return (
    <li className="inline-block pe-4 text-xs">
      <a
        className="text-xs text-gray-500 hover:text-gray-800 hover:underline focus:outline-none focus:underline dark:text-neutral-500 dark:hover:text-neutral-400"
        href={link}
      >
        {name}
      </a>
    </li>
  );
};
