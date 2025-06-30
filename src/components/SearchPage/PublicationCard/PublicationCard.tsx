import styles from "./PublicationCard.module.scss";

interface Publication {
    id: string;
    date: string;
    source: string;
    sourceLink: string;
    title: string;
    content: string;
    attributes: {
        isTechNews: boolean;
        isAnnouncement: boolean;
        isDigest: boolean;
        wordCount: number;
    };
}

interface Props {
    publication: Publication;
}

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("ru-RU");

const getWordSuffix = (n: number) => {
    if (n % 10 === 1 && n % 100 !== 11) return "слово";
    if ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100)) return "слова";
    return "слов"
}

const PublicationCard: React.FC<Props> = ({ publication }) => {
    const { date, source, sourceLink, title, content, attributes } = publication;
    const tags = [
        attributes.isTechNews && "Технические новости",
        attributes.isTechNews && "Анонсы и события",
        attributes.isTechNews && "Сводки новостей",
    ].filter(Boolean) as string[];

    // if (attributes.isTechNews) tags.push("Технические новости");
    // if (attributes.isAnnouncement) tags.push("Анонсы и события");
    // if (attributes.isDigest) tags.push("Сводки новостей");

    return (
        <article className={styles.card}>
            <div className={styles.header}>
                <span className={styles.date}>{formatDate(date)}</span>
                <a href={sourceLink} target="_blank" rel="noopener noreferrer" className={styles.source}>
                    {source}
                </a>
            </div>

            <h3 className={styles.title}>{title}</h3>

            <div className={styles.tags}>
                {tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>{tag}</span>
                ))}
            </div>

            {/* <div className={styles.content}>{content}</div> */}
            <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }}></div>

            <div className={styles.footer}>
                <a href={sourceLink} target="_blank" rel="noopener noreferrer" className={styles.readBtn}>
                    Читать в источнике
                </a>
                <span className={styles.wordCount}>{attributes.wordCount} {getWordSuffix(attributes.wordCount)}</span>
            </div>
        </article>
    )
}

export default PublicationCard