export default function HeaderSection({
    textFirst,
    textSecond = "",
    isCenteredText = false,
    isMarginLeftText = false,
}) {
    if (isCenteredText) {
        return (
            <div className="header-container-new-history">
                <h1 className="header-of-section">{textFirst}</h1>
            </div>
        );
    } else if (textSecond === "" || !textSecond) {
        return (
            <div className="header-container-search-result-prisoners">
                <div className="span-of-section-prisoners"></div>
                <h1 className="header-of-section-prisoners">{textFirst}</h1>
            </div>
        );
    } else if (isMarginLeftText) {
        return (
            <div className="header-container-search-result">
                <h2 className="span-of-section">{textFirst}</h2>
                <h1 className="header-of-section">{textSecond}</h1>
            </div>
        );
    }

    return (
        <div className="header-container-2h">
            <h2 className="span-of-section-2h">{textFirst}</h2>
            <h1 className="header-of-section-2h">{textSecond}</h1>
        </div>
    );
}
