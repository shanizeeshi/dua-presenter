#!/usr/bin/env python3
from __future__ import annotations

import json
import re
from html import unescape
from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "raw-kumail.html"
TARGET = ROOT / "data" / "dua-kumail.json"


def normalize_whitespace(value: str) -> str:
    return re.sub(r"\s+", " ", unescape(value)).strip()


class KumailHTMLParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.in_blockquote = False
        self.in_paragraph = False
        self.current_text: list[str] = []
        self.nodes: list[tuple[str, str]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag == "blockquote":
            self.in_blockquote = True
            return

        if tag == "p":
            self.in_paragraph = True
            self.current_text = []

    def handle_endtag(self, tag: str) -> None:
        if tag == "p" and self.in_paragraph:
            content = normalize_whitespace("".join(self.current_text))
            if content:
                kind = "arabic" if self.in_blockquote else "paragraph"
                self.nodes.append((kind, content))
            self.in_paragraph = False
            self.current_text = []
            return

        if tag == "blockquote":
            self.in_blockquote = False

    def handle_data(self, data: str) -> None:
        if self.in_paragraph:
            self.current_text.append(data)


def parse_segments(html_text: str) -> list[dict[str, object]]:
    parser = KumailHTMLParser()
    parser.feed(html_text)

    segments: list[dict[str, object]] = []
    index = 0
    nodes = parser.nodes

    while index < len(nodes):
        kind, arabic = nodes[index]
        if kind != "arabic":
            index += 1
            continue

        if index + 2 >= len(nodes):
            raise ValueError(f"Incomplete segment starting at node {index}")

        transliteration_kind, transliteration = nodes[index + 1]
        english_kind, english = nodes[index + 2]

        if transliteration_kind != "paragraph" or english_kind != "paragraph":
            raise ValueError(f"Unexpected node ordering near node {index}")

        segments.append(
            {
                "id": len(segments) + 1,
                "arabic": arabic,
                "transliteration": transliteration,
                "english": english,
                "farsi": "",
                "urdu": "",
            }
        )
        index += 3

    if not segments:
        raise ValueError("No segments were parsed from raw-kumail.html")

    return segments


def main() -> None:
    html_text = SOURCE.read_text(encoding="utf-8")
    segments = parse_segments(html_text)
    TARGET.parent.mkdir(parents=True, exist_ok=True)
    TARGET.write_text(
        json.dumps(segments, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Wrote {len(segments)} segments to {TARGET}")


if __name__ == "__main__":
    main()
