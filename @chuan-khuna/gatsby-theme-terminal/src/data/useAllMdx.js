import { useStaticQuery, graphql } from 'gatsby'

const DRAFT = 'draft'

export const useAllMdx = (filter) => {
  // This query is a duplicate of singleMdx so if you update this one update that one too! in layouts/SourceLayout
  const query = useStaticQuery(graphql`
    query allMdx {
      allMdx(
        filter: {
          frontmatter: {
            title: { ne: "dummy" }
            navigationLabel: { ne: "dummy" }
            status: { ne: "draft" }
          }
          fields: { parent: { ne: "" } }
        }
        sort: {
          order: [DESC, DESC]
          fields: [frontmatter___dateModified, frontmatter___date]
        }
      ) {
        edges {
          node {
            id
            body
            excerpt
            timeToRead
            wordCount {
              words
            }
            featuredImageUrlSharp {
              childImageSharp {
                original {
                  width
                  height
                  src
                }
                fluid(maxWidth: 1200, quality: 90) {
                  ...GatsbyImageSharpFluid
                }
                fixed(quality: 90) {
                  ...GatsbyImageSharpFixed
                }
                id
              }
            }
            frontmatter {
              title
              tags
              date
              dateModified
              author
              status
              isPrivate
              isNote
              growthStage
              url
              misc
              pinned
              featuredImage {
                childImageSharp {
                  original {
                    width
                    height
                    src
                  }
                  fluid(maxWidth: 1200, quality: 90) {
                    ...GatsbyImageSharpFluid
                  }
                  fixed(quality: 90) {
                    ...GatsbyImageSharpFixed
                  }
                  id
                }
              }
              featuredImageUrl
              embeddedImages {
                childImageSharp {
                  original {
                    width
                    height
                    src
                  }
                  fluid(maxWidth: 1200, quality: 90) {
                    ...GatsbyImageSharpFluid
                  }
                  fixed(quality: 90) {
                    ...GatsbyImageSharpFixed
                  }
                  id
                }
              }
              embeddedImageUrls
            }
            fields {
              slug
              owner
              parent
            }
          }
        }
      }
    }
  `)

  if (!filter)
    return query.allMdx.edges.filter(
      (edge) =>
        edge.node.frontmatter.status !== DRAFT &&
        edge.node.frontmatter.isPrivate !== true
    )

  return query.allMdx.edges
    .map((edge) => edge)
    .filter(
      (edge) =>
        edge.node.fields.slug.includes(filter) &&
        edge.node.frontmatter.status !== DRAFT &&
        edge.node.frontmatter.isPrivate !== true
    )
}
