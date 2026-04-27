export const repoItemTest = (item, nativeItem) => {
  const formatCount = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "k";
    }
    return count;
  };

  expect(nativeItem).toHaveTextContent(new RegExp(item.fullName));
  expect(nativeItem).toHaveTextContent(new RegExp(item.description));
  expect(nativeItem).toHaveTextContent(new RegExp(item.language));
  expect(nativeItem).toHaveTextContent(
    new RegExp(formatCount(item.forksCount)),
  );
  expect(nativeItem).toHaveTextContent(
    new RegExp(formatCount(item.stargazersCount)),
  );
  expect(nativeItem).toHaveTextContent(new RegExp(String(item.ratingAverage)));
  expect(nativeItem).toHaveTextContent(new RegExp(String(item.reviewCount)));
};
