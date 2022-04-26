import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

interface Props {
  title: string;
  children: JSX.Element;
}

const Html: React.FC<Props> = ({ title, children }) => {
  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="./style.css" />
      </head>
      <body>{children}</body>
    </html>
  );
};

export const renderHtml = ({ title, children }: Props) =>
  renderToStaticMarkup(<Html title={title} children={children} />);
