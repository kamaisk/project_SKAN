import type { DocumentOk } from "../../../api/documents";
import styles from "./PublicationCard.module.scss";
import he from "he";

interface Props {
    publication: DocumentOk;
}
const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("ru-RU");

const getWordSuffix = (n: number) => {
    if (n % 10 === 1 && n % 100 !== 11) return "слово";
    if ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100)) return "слова";
    return "слов"
}

const stripTags = (markup: string) => {
    const decoded = he.decode(markup);
    return decoded.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

const PublicationCard: React.FC<Props> = ({ publication }) => {
    const { issueDate, url, source, title, content, attributes } = publication;
    const tags: string[] = [];
    if (attributes.isTechNews) tags.push("Технические новости");
    if (attributes.isAnnouncement) tags.push("Анонсы и события");
    if (attributes.isDigest) tags.push("Сводки новостей");

    return (
        <article className={styles.card}>
            <div className={styles.header}>
                <span className={styles.date}>{formatDate(issueDate)}</span>
                <a href={url} target="_blank" rel="noopener noreferrer" className={styles.source}>
                    {source.name}
                </a>
            </div>

            <h3 className={styles.title}>{title.text}</h3>

            <div className={styles.tags}>
                {tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>{tag}</span>
                ))}
            </div>

            {/* <div className={styles.content}>{(content.markup).slice(0, 300)}</div> */}
            <div className={styles.content}>{stripTags(content.markup).slice(0, 500)}</div>
            {/* <div className={styles.content} dangerouslySetInnerHTML={{ __html: content.markup }}></div> */}

            <div className={styles.footer}>
                <a href={url} target="_blank" rel="noopener noreferrer" className={styles.readBtn}>
                    Читать в источнике
                </a>
                <span className={styles.wordCount}>{attributes.wordCount} {getWordSuffix(attributes.wordCount)}</span>
            </div>
        </article>
    )
}

export default PublicationCard